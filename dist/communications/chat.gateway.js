"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ws_1 = require("ws");
const message_schema_1 = require("./schemas/message.schema");
const user_schema_1 = require("../users/schemas/user.schema");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    httpAdapterHost;
    messageModel;
    userModel;
    logger = new common_1.Logger(ChatGateway_1.name);
    wss = null;
    rooms = new Map();
    clientMeta = new Map();
    constructor(httpAdapterHost, messageModel, userModel) {
        this.httpAdapterHost = httpAdapterHost;
        this.messageModel = messageModel;
        this.userModel = userModel;
    }
    async onModuleInit() {
        try {
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
            this.wss = new ws_1.WebSocketServer({
                server: httpServer,
                path: '/ws/chat'
            });
            this.wss.on('connection', (ws, req) => {
                this.handleConnection(ws, req);
            });
            this.logger.log('Real-Time WebSocket Chat Gateway initialized on path: /ws/chat');
        }
        catch (err) {
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
    handleConnection(ws, req) {
        this.clientMeta.set(ws, { currentRoomId: 'chambers-general' });
        this.logger.log(`New client connected to Real-Time Chat (IP: ${req.socket.remoteAddress})`);
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
            }
            catch (err) {
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
    handleDisconnection(ws) {
        const meta = this.clientMeta.get(ws);
        if (meta?.currentRoomId) {
            const roomSet = this.rooms.get(meta.currentRoomId);
            if (roomSet) {
                roomSet.delete(ws);
                if (roomSet.size === 0) {
                    this.rooms.delete(meta.currentRoomId);
                }
                else {
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
    async handleClientPayload(ws, payload) {
        const actionType = payload.type || payload.event;
        switch (actionType) {
            case 'join_room': {
                const roomId = (payload.roomId || 'chambers-general').trim();
                const meta = this.clientMeta.get(ws) || {};
                if (meta.currentRoomId && meta.currentRoomId !== roomId) {
                    const prevRoom = this.rooms.get(meta.currentRoomId);
                    if (prevRoom) {
                        prevRoom.delete(ws);
                    }
                }
                meta.currentRoomId = roomId;
                if (payload.user) {
                    meta.userId = payload.user.id || payload.user._id || meta.userId;
                    meta.userName = payload.user.name || meta.userName;
                    meta.userRole = payload.user.role || meta.userRole;
                    meta.avatarUrl = payload.user.avatarUrl || meta.avatarUrl;
                    if (meta.userId && mongoose_2.Types.ObjectId.isValid(meta.userId)) {
                        try {
                            const dbUser = await this.userModel.findById(meta.userId).exec();
                            if (dbUser) {
                                meta.userName = `${dbUser.firstName} ${dbUser.lastName}`.trim();
                                meta.userRole = dbUser.role || meta.userRole;
                                meta.avatarUrl = dbUser.avatarUrl || meta.avatarUrl;
                            }
                        }
                        catch (e) {
                        }
                    }
                }
                this.clientMeta.set(ws, meta);
                if (!this.rooms.has(roomId)) {
                    this.rooms.set(roomId, new Set());
                }
                const roomSet = this.rooms.get(roomId);
                roomSet.add(ws);
                this.sendJson(ws, {
                    type: 'room_joined',
                    roomId,
                    activeCount: roomSet.size
                });
                const history = await this.getRoomHistory(roomId);
                this.sendJson(ws, {
                    type: 'room_history',
                    roomId,
                    messages: history
                });
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
                if (senderId && mongoose_2.Types.ObjectId.isValid(senderId)) {
                    try {
                        const dbUser = await this.userModel.findById(senderId).exec();
                        if (dbUser) {
                            senderName = `${dbUser.firstName} ${dbUser.lastName}`.trim();
                            senderRole = dbUser.role || senderRole;
                            senderAvatar = dbUser.avatarUrl || senderAvatar;
                            senderEmail = dbUser.email || senderEmail;
                        }
                    }
                    catch (e) {
                    }
                }
                const saved = await this.messageModel.create({
                    channel: 'chat',
                    threadId: roomId,
                    subject: payload.subject || `Message in #${roomId}`,
                    body: text,
                    from: senderEmail || `${senderName.toLowerCase().replace(/[^a-z]/g, '')}@stalwartlc.com`,
                    senderName,
                    senderRole,
                    senderAvatar,
                    senderId: senderId && mongoose_2.Types.ObjectId.isValid(senderId) ? new mongoose_2.Types.ObjectId(senderId) : undefined,
                    direction: 'chat',
                    status: 'sent',
                    matterId: payload.matterId && mongoose_2.Types.ObjectId.isValid(payload.matterId) ? new mongoose_2.Types.ObjectId(payload.matterId) : undefined,
                    matterTitle: payload.matterTitle,
                    clientId: payload.clientId && mongoose_2.Types.ObjectId.isValid(payload.clientId) ? new mongoose_2.Types.ObjectId(payload.clientId) : undefined,
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
                    createdAt: saved.createdAt || new Date(),
                    sentAt: saved.sentAt || new Date()
                };
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
    sendJson(ws, obj) {
        if (ws.readyState === ws_1.WebSocket.OPEN) {
            ws.send(JSON.stringify(obj));
        }
    }
    broadcastToRoom(roomId, obj, excludeWs) {
        const roomSet = this.rooms.get(roomId);
        if (!roomSet)
            return;
        const payload = JSON.stringify(obj);
        for (const client of roomSet) {
            if (client !== excludeWs && client.readyState === ws_1.WebSocket.OPEN) {
                client.send(payload);
            }
        }
    }
    async getRoomHistory(roomId) {
        const messages = await this.messageModel
            .find({
            channel: 'chat',
            threadId: roomId
        })
            .sort({ createdAt: 1 })
            .limit(100)
            .exec();
        return messages;
    }
};
exports.ChatGateway = ChatGateway;
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost,
        mongoose_2.Model,
        mongoose_2.Model])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map