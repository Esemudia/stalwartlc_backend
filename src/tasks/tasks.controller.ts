import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';

@Controller('api/v1/tasks')
export class TasksController {
    constructor(@InjectModel(Task.name) private readonly model: Model<Task>) { }

    @Post()
    async create(@Body() createDto: any, @Headers('x-user-role') headerRole?: string, @Headers('x-user-name') headerName?: string) {
        const creatorRole = createDto.creatorRole || headerRole || 'super_admin';
        const creatorName = createDto.creatorName || headerName || 'Staff';

        // Tasks created by lawyers require admin approval
        const approvalStatus = creatorRole === 'lawyer' ? 'pending_approval' : (createDto.approvalStatus || 'approved');

        const taskData = {
            ...createDto,
            creatorRole,
            creatorName,
            approvalStatus,
            ...(approvalStatus === 'approved' && !createDto.approvedAt ? { approvedAt: new Date() } : {})
        };

        const created = new this.model(taskData);
        return await created.save();
    }

    @Get()
    async findAll() {
        return await this.model.find().sort({ createdAt: -1 }).exec();
    }

    @Get('pending-approvals')
    async findPendingApprovals() {
        return await this.model.find({ approvalStatus: 'pending_approval' }).sort({ createdAt: -1 }).exec();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.model.findById(id).exec();
    }

    @Patch(':id/approve')
    async approveTask(
        @Param('id') id: string,
        @Body() body: any,
        @Headers('x-user-role') userRole?: string,
        @Headers('x-user-name') userName?: string
    ) {
        const role = body.role || userRole || 'super_admin';
        // Only admin / super_admin / exec_secretary can approve lawyer tasks
        if (role === 'lawyer') {
            throw new ForbiddenException('Lawyers cannot approve their own tasks. Only Administrator has approval privilege.');
        }

        const approver = body.approvedBy || userName || 'Administrator';
        return await this.model.findByIdAndUpdate(
            id,
            {
                approvalStatus: 'approved',
                approvedBy: approver,
                approvedAt: new Date(),
                rejectionReason: null
            },
            { new: true }
        ).exec();
    }

    @Patch(':id/reject')
    async rejectTask(
        @Param('id') id: string,
        @Body() body: any,
        @Headers('x-user-role') userRole?: string
    ) {
        const role = body.role || userRole || 'super_admin';
        if (role === 'lawyer') {
            throw new ForbiddenException('Lawyers cannot reject tasks. Only Administrator has approval privilege.');
        }

        return await this.model.findByIdAndUpdate(
            id,
            {
                approvalStatus: 'rejected',
                rejectionReason: body.reason || 'Rejected by administration review.'
            },
            { new: true }
        ).exec();
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: any) {
        return await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Headers('x-user-role') userRole?: string
    ) {
        if (userRole === 'lawyer') {
            throw new ForbiddenException('Only Administrators have permission to delete tasks.');
        }
        return await this.model.findByIdAndDelete(id).exec();
    }
}
