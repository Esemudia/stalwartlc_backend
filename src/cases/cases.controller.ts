import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CasesService } from './cases.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Cases')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('cases')
export class CasesController {
    constructor(private casesService: CasesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new case' })
    async create(@Body() createCaseDto: any) {
        return this.casesService.create(createCaseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all cases (or filtered by user)' })
    async findAll(@Request() req: any) {
        const userRole = req.user.role;
        if (userRole === 'client') {
            return this.casesService.findByClientId(req.user.userId);
        }
        // Lawyers, Admins, etc. see all
        return this.casesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get case by ID' })
    async findOne(@Param('id') id: string) {
        return this.casesService.findById(id);
    }
}
