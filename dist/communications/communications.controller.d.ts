import { Model, Types } from 'mongoose';
import { Message } from './schemas/message.schema';
import { User } from '../users/schemas/user.schema';
import { Matter } from '../matters/schemas/matter.schema';
import { ChatGateway } from './chat.gateway';
import * as dns from 'dns';
export declare class CommunicationsController {
    private readonly model;
    private readonly userModel;
    private readonly matterModel;
    private readonly chatGateway;
    constructor(model: Model<Message>, userModel: Model<User>, matterModel: Model<Matter>, chatGateway: ChatGateway);
    getServerConfig(): Promise<{
        domain: string;
        status: string;
        mxRecords: {
            host: string;
            priority: number;
            ip: string;
            status: string;
            ttl: number;
            type: string;
        }[];
        protocols: {
            smtp: {
                host: string;
                port: number;
                security: string;
                authentication: string;
                status: string;
            };
            imap: {
                host: string;
                port: number;
                security: string;
                authentication: string;
                status: string;
            };
        };
        dnsSecurity: {
            spf: {
                record: string;
                status: string;
            };
            dkim: {
                selector: string;
                algorithm: string;
                status: string;
            };
            dmarc: {
                record: string;
                status: string;
            };
        };
        lastAudit: string;
    }>;
    verifyMxRecords(body: {
        domain?: string;
    }): Promise<{
        domain: string;
        status: string;
        count: number;
        records: dns.MxRecord[];
        source: string;
        timestamp: string;
        notice?: undefined;
    } | {
        domain: string;
        status: string;
        count: number;
        records: {
            exchange: string;
            priority: number;
        }[];
        notice: string;
        timestamp: string;
        source?: undefined;
    }>;
    getChatChannels(): Promise<{
        id: string;
        name: string;
        label: string;
        description: string;
        type: string;
        icon: string;
        membersCount: number;
    }[]>;
    getChatMessages(roomId?: string): Promise<any[]>;
    getChatMessagesByPath(roomId: string): Promise<any[]>;
    sendChatMessage(body: any): Promise<{
        _id: string;
        id: string;
        channel: string;
        threadId: any;
        body: string | undefined;
        senderName: string | undefined;
        senderRole: string | undefined;
        senderAvatar: string | undefined;
        senderId: string | undefined;
        attachments: any[];
        matterId: string | undefined;
        matterTitle: string | undefined;
        createdAt: any;
        sentAt: Date;
    } | {
        error: string;
    }>;
    sendEmail(body: any): Promise<import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    receiveEmail(body: any): Promise<import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    create(createDto: any): Promise<import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: any): Promise<(import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    toggleStar(id: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    markAsRead(id: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateDto: any): Promise<(import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
