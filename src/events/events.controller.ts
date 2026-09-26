import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';

@Controller('api/v1/events')
export class EventsController {
    constructor(@InjectModel(Event.name) private readonly model: Model<Event>) { }

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
