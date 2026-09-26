import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Client } from './schemas/client.schema';

@Controller('api/v1/clients')
export class ClientsController {
    constructor(@InjectModel(Client.name) private clientModel: Model<Client>) { }

    @Post()
    async create(@Body() createClientDto: any) {
        const createdClient = new this.clientModel(createClientDto);
        return await createdClient.save();
    }

    @Get()
    async findAll() {
        return await this.clientModel.find().exec();
    }

    @Post('login')
    async loginClient(@Body() credentials: { email: string; clientNumber: string }) {
        const client = await this.clientModel.findOne({
            email: credentials.email,
            clientNumber: credentials.clientNumber
        }).exec();

        if (!client) {
            throw new UnauthorizedException('Invalid email or client number');
        }

        // Just returning the client object as the token/session data payload for simplicity
        return client;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.clientModel.findById(id).exec();
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateClientDto: any) {
        return await this.clientModel.findByIdAndUpdate(id, updateClientDto, { new: true }).exec();
    }

    @Post(':id/archive')
    async archive(@Param('id') id: string) {
        return await this.clientModel.findByIdAndUpdate(id, { status: 'archived' }, { new: true }).exec();
    }
}
