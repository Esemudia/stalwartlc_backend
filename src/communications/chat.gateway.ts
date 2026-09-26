import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WebSocketServer, WebSocket } from 'ws';
import { Message } from './schemas/message.schema';
import { User } from '../users/schemas/user.schema';

interface ClientMeta {
    userId?: string;
    userName?: string;
    userRole?: string;
    avatarUrl?: string;
    currentRoomId?: string;
}

@Injectable()
export class ChatGateway implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(ChatGateway.name);
    private wss: WebSocketServer | null = null;
    private rooms = new Map<string, Set<WebSocket>>();
    private clientMeta = new Map<WebSocket, ClientMeta>();

    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    async onModuleInit() {
        try {
            // Clean up any old dummy test messages from database
            await this.messageModel.deleteMany({
                $or: [
                    { senderName: 'Dr. C. O. Stalwart (SAN)' },
                    { senderName: 'Chioma Nnamani, Esq.', channel: 'chat' },
                    { senderName: 'K. O. Balogun, Esq.', channel: 'chat' },
                    { senderName: 'Zainab Mohammed (Registrar)', channel: 'chat' }
                ]
            }).exec();

            const httpServer = this.httpAdapterHost.httpAdapter.getHttpServer();
            if (!httpServer) {
                this.logger.warn('HTTP server not available yet to attach WebSocketServer.');
                return;
            }

            // Create WebSocketServer attached to the main HTTP server on path '/ws/chat'
            this.wss = new WebSocketServer({
                server: httpServer,
                path: '/ws/chat'
            });

            this.wss.on('connection', (ws: WebSocket, req) => {
                this.handleConnection(ws, req);
            });

            this.logger.log('Real-Time WebSocket Chat Gateway initialized on path: /ws/chat');
        } catch (err: any) {
            this.logger.error(`Failed to initialize WebSocketServer on HTTP server: ${err.message}`);
        }
    }

    onModuleDestroy() {
        if (this.wss) {
            this.wss.close(() => {
                this.logger.log('WebSocketServer closed.');
            });
        }
    }

    private handleConnection(ws: WebSocket, req: any) {
        this.clientMeta.set(ws, { currentRoomId: 'chambers-general' });
        this.logger.log(`New client connected to Real-Time Chat (IP: ${req.socket.remoteAddress})`);

        // Send connection confirmation
        this.sendJson(ws, {
            type: 'connected',
            serverTime: new Date().toISOString(),
            defaultRoom: 'chambers-general',
            status: 'online'
        });

        ws.on('message', async (data) => {
            try {
                const payload = JSON.parse(data.toString());
                await this.handleClientPayload(ws, payload);
            } catch (err: any) {
                this.logger.warn(`Malformed WebSocket payload: ${err.message}`);
                this.sendJson(ws, { type: 'error', message: 'Invalid payload format' });
            }
        });

        ws.on('close', () => {
            this.handleDisconnection(ws);
        });

        ws.on('error', (err) => {
            this.logger.warn(`WebSocket error: ${err.message}`);
            this.handleDisconnection(ws);
        });
    }

    private handleDisconnection(ws: WebSocket) {
        const meta = this.clientMeta.get(ws);
        if (meta?.currentRoomId) {
            const roomSet = this.rooms.get(meta.currentRoomId);
            if (roomSet) {
                roomSet.delete(ws);
                if (roomSet.size === 0) {
                    this.rooms.delete(meta.currentRoomId);
                } else {
                    this.broadcastToRoom(meta.currentRoomId, {
                        type: 'user_left',
                        roomId: meta.currentRoomId,
                        userName: meta.userName || 'A participant',
                        activeCount: roomSet.size
                    });
                }
            }
        }
        this.clientMeta.delete(ws);
    }

    private async handleClientPayload(ws: WebSocket, payload: any) {
        const actionType = payload.type || payload.event;

        switch (actionType) {
            case 'join_room': {
                const roomId = (payload.roomId || 'chambers-general').trim();
                const meta = this.clientMeta.get(ws) || {};

                // Leave previous room if any
                if (meta.currentRoomId && meta.currentRoomId !== roomId) {
                    const prevRoom = this.rooms.get(meta.currentRoomId);
                    if (prevRoom) {
                        prevRoom.delete(ws);
                    }
                }

                // Update meta
                meta.currentRoomId = roomId;
                if (payload.user) {
                    meta.userId = payload.user.id || payload.user._id || meta.userId;
                    meta.userName = payload.user.name || meta.userName;
                    meta.userRole = payload.user.role || meta.userRole;
                    meta.avatarUrl = payload.user.avatarUrl || meta.avatarUrl;

                    // If user id is in database, load authoritative profile from DB
                    if (meta.userId && Types.ObjectId.isValid(meta.userId)) {
                        try {
                            const dbUser = await this.userModel.findById(meta.userId).exec();
                            if (dbUser) {
                                meta.userName = `${dbUser.firstName} ${dbUser.lastName}`.trim();
                                meta.userRole = dbUser.role || meta.userRole;
                                meta.avatarUrl = dbUser.avatarUrl || meta.avatarUrl;
                            }
                        } catch (e) {
                            // ignore
                        }
                    }
                }
                this.clientMeta.set(ws, meta);

                // Add to room Set
                if (!this.rooms.has(roomId)) {
                    this.rooms.set(roomId, new Set());
                }
                const roomSet = this.rooms.get(roomId)!;
                roomSet.add(ws);

                // Send room joined confirmation
                this.sendJson(ws, {
                    type: 'room_joined',
                    roomId,
                    activeCount: roomSet.size
                });

                // Fetch history from DB
                const history = await this.getRoomHistory(roomId);
                this.sendJson(ws, {
                    type: 'room_history',
                    roomId,
                    messages: history
                });

                // Broadcast user joined to other members in the room
                this.broadcastToRoom(roomId, {
                    type: 'user_joined',
                    roomId,
                    user: {
                        id: meta.userId,
                        name: meta.userName || 'Counsel',
                        role: meta.userRole || 'staff'
                    },
                    activeCount: roomSet.size
                }, ws);

                break;
            }

            case 'send_message': {
                const roomId = (payload.roomId || this.clientMeta.get(ws)?.currentRoomId || 'chambers-general').trim();
                const text = (payload.text || payload.body || '').trim();
                const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];

                if (!text && attachments.length === 0) {
                    return;
                }

                const meta = this.clientMeta.get(ws);
                const sender = payload.sender || {};
                let senderName = sender.name || meta?.userName || 'Counsel';
                let senderRole = sender.role || meta?.userRole || 'staff';
                let senderAvatar = sender.avatarUrl || meta?.avatarUrl || '';
                let senderEmail = sender.email;
                const senderId = sender.id || meta?.userId;

                // If senderId or senderEmail exists, fetch authoritative practitioner from DB
                if (senderId && Types.ObjectId.isValid(senderId)) {
                    try {
                        const dbUser = await this.userModel.findById(senderId).exec();
                        if (dbUser) {
                            senderName = `${dbUser.firstName} ${dbUser.lastName}`.trim();
                            senderRole = dbUser.role || senderRole;
                            senderAvatar = dbUser.avatarUrl || senderAvatar;
                            senderEmail = dbUser.email || senderEmail;
                        }
                    } catch (e) {
                        // ignore
                    }
                }

                // Save to MongoDB
                const saved = await this.messageModel.create({
                    channel: 'chat',
                    threadId: roomId,
                    subject: payload.subject || `Message in #${roomId}`,
                    body: text,
                    from: senderEmail || `${senderName.toLowerCase().replace(/[^a-z]/g, '')}@stalwartlc.com`,
                    senderName,
                    senderRole,
                    senderAvatar,
                    senderId: senderId && Types.ObjectId.isValid(senderId) ? new Types.ObjectId(senderId) : undefined,
                    direction: 'chat',
                    status: 'sent',
                    matterId: payload.matterId && Types.ObjectId.isValid(payload.matterId) ? new Types.ObjectId(payload.matterId) : undefined,
                    matterTitle: payload.matterTitle,
                    clientId: payload.clientId && Types.ObjectId.isValid(payload.clientId) ? new Types.ObjectId(payload.clientId) : undefined,
                    clientName: payload.clientName,
                    attachments,
                    sentAt: new Date(),
                    receivedAt: new Date()
                });

                const formattedMessage = {
                    _id: saved._id.toString(),
                    id: saved._id.toString(),
                    channel: 'chat',
                    threadId: roomId,
                    body: saved.body,
                    senderName: saved.senderName,
                    senderRole: saved.senderRole,
                    senderAvatar: saved.senderAvatar,
                    senderId: saved.senderId?.toString(),
                    attachments: saved.attachments || [],
                    matterId: saved.matterId?.toString(),
                    matterTitle: saved.matterTitle,
                    createdAt: (saved as any).createdAt || new Date(),
                    sentAt: saved.sentAt || new Date()
                };

                // Broadcast to all participants in this room (including sender)
                this.broadcastToRoom(roomId, {
                    type: 'new_message',
                    roomId,
                    message: formattedMessage
                });

                break;
            }

            case 'typing': {
                const roomId = (payload.roomId || this.clientMeta.get(ws)?.currentRoomId || 'chambers-general').trim();
                const meta = this.clientMeta.get(ws);
                const userName = payload.user?.name || meta?.userName || 'Counsel';

                this.broadcastToRoom(roomId, {
                    type: 'user_typing',
                    roomId,
                    userName
                }, ws);
                break;
            }

            case 'ping': {
                this.sendJson(ws, { type: 'pong', time: Date.now() });
                break;
            }

            default: {
                this.logger.debug(`Unhandled websocket action: ${actionType}`);
            }
        }
    }

    private sendJson(ws: WebSocket, obj: any) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(obj));
        }
    }

    public broadcastToRoom(roomId: string, obj: any, excludeWs?: WebSocket) {
        const roomSet = this.rooms.get(roomId);
        if (!roomSet) return;

        const payload = JSON.stringify(obj);
        for (const client of roomSet) {
            if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
                client.send(payload);
            }
        }
    }

    public async getRoomHistory(roomId: string): Promise<any[]> {
        const messages = await this.messageModel
            .find({
                channel: 'chat',
                threadId: roomId
            })
            .sort({ createdAt: 1 })
            .limit(100)
            .exec();

        // Return real messages from MongoDB without any dummy/mock seeding
        return messages;
    }
}
