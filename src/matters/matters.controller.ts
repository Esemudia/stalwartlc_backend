import { Controller, Get, Post, Body, Patch, Param, Headers, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Matter } from './schemas/matter.schema';
import { User } from '../users/schemas/user.schema';

@Controller('api/v1/matters')
export class MattersController {
    constructor(
        @InjectModel(Matter.name) private matterModel: Model<Matter>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    private async resolveLawyerUserIds(headerId?: string, headerEmail?: string, headerName?: string): Promise<Types.ObjectId[]> {
        const ids: Types.ObjectId[] = [];
        if (headerId && Types.ObjectId.isValid(headerId)) {
            ids.push(new Types.ObjectId(headerId));
        }
        if (headerEmail) {
            const userByEmail = await this.userModel.findOne({ email: headerEmail.toLowerCase() }).exec();
            if (userByEmail && !ids.some(i => i.equals(userByEmail._id as Types.ObjectId))) {
                ids.push(userByEmail._id as Types.ObjectId);
            }
        }
        if (headerName && ids.length === 0) {
            const userByName = await this.userModel.findOne({
                $or: [
                    { firstName: { $regex: new RegExp(headerName, 'i') } },
                    { lastName: { $regex: new RegExp(headerName, 'i') } }
                ]
            }).exec();
            if (userByName && !ids.some(i => i.equals(userByName._id as Types.ObjectId))) {
                ids.push(userByName._id as Types.ObjectId);
            }
        }
        return ids;
    }

    @Post()
    async create(
        @Body() createMatterDto: any,
        @Headers('x-user-role') headerRole?: string
    ) {
        if (headerRole === 'lawyer') {
            throw new ForbiddenException('Only Administrators have permission to register new matters.');
        }
        const createdMatter = new this.matterModel(createMatterDto);
        return await createdMatter.save();
    }

    @Get()
    async findAll(
        @Headers('x-user-role') headerRole?: string,
        @Headers('x-user-id') headerId?: string,
        @Headers('x-user-email') headerEmail?: string,
        @Headers('x-user-name') headerName?: string
    ) {
        if (headerRole === 'lawyer') {
            const lawyerIds = await this.resolveLawyerUserIds(headerId, headerEmail, headerName);
            if (lawyerIds.length === 0) {
                return [];
            }
            return await this.matterModel.find({
                $or: [
                    { assignedLawyerIds: { $in: lawyerIds } },
                    { assignedPartnerId: { $in: lawyerIds } }
                ]
            }).exec();
        }
        return await this.matterModel.find().exec();
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Headers('x-user-role') headerRole?: string,
        @Headers('x-user-id') headerId?: string,
        @Headers('x-user-email') headerEmail?: string,
        @Headers('x-user-name') headerName?: string
    ) {
        const matter = await this.matterModel.findById(id).exec();
        if (!matter) {
            throw new NotFoundException(`Matter ${id} not found`);
        }
        if (headerRole === 'lawyer') {
            const lawyerIds = await this.resolveLawyerUserIds(headerId, headerEmail, headerName);
            const isAssigned = lawyerIds.some(lid =>
                (matter.assignedLawyerIds || []).some((aid: any) => aid.toString() === lid.toString()) ||
                (matter.assignedPartnerId && matter.assignedPartnerId.toString() === lid.toString())
            );
            if (!isAssigned) {
                throw new ForbiddenException('Access denied: You are only permitted to access matters assigned to you.');
            }
        }
        return matter;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateMatterDto: any) {
        return await this.matterModel.findByIdAndUpdate(id, updateMatterDto, { new: true }).exec();
    }

    @Post(':id/assign')
    async assignLawyers(
        @Param('id') id: string,
        @Body() assignDto: { lawyerIds: string[] },
        @Headers('x-user-role') headerRole?: string
    ) {
        if (headerRole === 'lawyer') {
            throw new ForbiddenException('Only Administrators have permission to assign lawyers to matters.');
        }
        return await this.matterModel.findByIdAndUpdate(
            id,
            { $addToSet: { assignedLawyerIds: { $each: assignDto.lawyerIds.map(i => new Types.ObjectId(i)) } } },
            { new: true }
        ).exec();
    }

    @Post(':id/close')
    async closeMatter(
        @Param('id') id: string,
        @Headers('x-user-role') headerRole?: string
    ) {
        if (headerRole === 'lawyer') {
            throw new ForbiddenException('Only Administrators have permission to close matters.');
        }
        return await this.matterModel.findByIdAndUpdate(id, { status: 'closed', closedAt: new Date() }, { new: true }).exec();
    }
}

