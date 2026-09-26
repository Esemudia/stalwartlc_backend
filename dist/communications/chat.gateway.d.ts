import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Model } from 'mongoose';
import { WebSocket } from 'ws';
import { Message } from './schemas/message.schema';
import { User } from '../users/schemas/user.schema';
export declare class ChatGateway implements OnModuleInit, OnModuleDestroy {
    private readonly httpAdapterHost;
    private readonly messageModel;
    private readonly userModel;
    private readonly logger;
    private wss;
    private rooms;
    private clientMeta;
    constructor(httpAdapterHost: HttpAdapterHost, messageModel: Model<Message>, userModel: Model<User>);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
    private handleConnection;
    private handleDisconnection;
    private handleClientPayload;
    private sendJson;
    broadcastToRoom(roomId: string, obj: any, excludeWs?: WebSocket): void;
    getRoomHistory(roomId: string): Promise<any[]>;
}
