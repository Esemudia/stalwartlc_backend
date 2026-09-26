import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';

@Controller('api/v1/notifications')
export class NotificationsController {
    constructor(@InjectModel(Notification.name) private readonly model: Model<Notification>) { }

    @Post()
    async create(@Body() createDto: any) {
        const created = new this.model(createDto);
        return await created.save();
    }

    @Get()
    async findAll() {
        return await this.model.find().exec();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.model.findById(id).exec();
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: any) {
        return await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
