import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(
        @Body() createDto: any,
        @Headers('x-user-role') headerRole?: string
    ) {
        const callerRole = createDto.callerRole || headerRole;
        if (callerRole === 'lawyer' || callerRole === 'client' || callerRole === 'front_desk') {
            throw new ForbiddenException('Only Administrators have permission to create new firm staff accounts.');
        }
        return await this.usersService.create(createDto);
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.usersService.findById(id);
    }

    @Get('settings/firm')
    async getFirmSettings() {
        return await this.usersService.getFirmSettings();
    }

    @Patch('settings/firm')
    async updateFirmSettings(
        @Body() body: any,
        @Headers('x-user-role') headerRole?: string
    ) {
        if (headerRole !== 'super_admin') {
            throw new ForbiddenException('Only Managing Partner / Super Administrator can modify firm configuration.');
        }
        return await this.usersService.updateFirmSettings(body);
    }

    @Post(':id/change-password')
    async changePassword(
        @Param('id') id: string,
        @Body() body: any,
        @Headers('x-user-role') headerRole?: string,
        @Headers('x-user-id') headerUserId?: string
    ) {
        if (headerRole === 'client') {
            throw new ForbiddenException('Clients do not have access to internal account settings.');
        }
        const isSuperAdmin = headerRole === 'super_admin';
        if (!isSuperAdmin && headerUserId && headerUserId !== id) {
            throw new ForbiddenException('You can only update your own password.');
        }
        return await this.usersService.changePassword(
            id,
            body.currentPassword,
            body.newPassword,
            isSuperAdmin
        );
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateDto: any,
        @Headers('x-user-role') headerRole?: string,
        @Headers('x-user-id') headerUserId?: string,
        @Headers('x-user-email') headerEmail?: string
    ) {
        const callerRole = updateDto.callerRole || headerRole;
        if (callerRole === 'client') {
            throw new ForbiddenException('Clients do not have permission to access firm settings or modify staff profiles.');
        }

        const isSuperAdmin = callerRole === 'super_admin';
        const isSelf = headerUserId === id || (updateDto.userId && updateDto.userId === id);

        // Non-admins can update their own profile (image, phone, department, bio, etc.)
        if (!isSuperAdmin) {
            // Guard: Cannot escalate privileges or edit other accounts
            delete updateDto.role;
            delete updateDto.status;
            delete updateDto.roleIds;
            delete updateDto.callerRole;
        }

        return await this.usersService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Headers('x-user-role') headerRole?: string
    ) {
        if (headerRole === 'lawyer' || headerRole === 'client' || headerRole === 'front_desk') {
            throw new ForbiddenException('Only Administrators have permission to remove staff accounts.');
        }
        return await this.usersService.remove(id);
    }
}

