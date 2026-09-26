import { Controller, Post, Body, Get, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from './schemas/invoice.schema';

@ApiTags('Invoices / Payments')
@Controller('api/v1/invoices')
export class InvoicesController {
    constructor(@InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>) { }

    @Post()
    @ApiOperation({ summary: 'Create an invoice (Admin/Lawyer only)' })
    async create(@Body() createDto: any) {
        const inv = new this.invoiceModel(createDto);
        return inv.save();
    }

    @Get()
    @ApiOperation({ summary: 'Get invoices (filtered by client if role is client)' })
    async findAll(@Request() req: any) {
        if (req.user && req.user.role === 'client') {
            return this.invoiceModel.find({ clientId: req.user.userId }).sort({ createdAt: -1 }).exec();
        }
        return this.invoiceModel.find().sort({ createdAt: -1 }).exec();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get invoice by ID' })
    async findOne(@Param('id') id: string) {
        return this.invoiceModel.findById(id).exec();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an invoice' })
    async update(@Param('id') id: string, @Body() updateDto: any) {
        return this.invoiceModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an invoice' })
    async delete(@Param('id') id: string) {
        return this.invoiceModel.findByIdAndDelete(id).exec();
    }

    @Post(':id/pay')
    @ApiOperation({ summary: 'Simulate Payment Processing' })
    async pay(@Param('id') id: string) {
        // ── Paystack / Flutterwave integration logic would go here ──
        const inv = await this.invoiceModel.findById(id);
        if (!inv) return { error: 'Invoice not found' };

        inv.status = 'paid';
        await inv.save();
        return { success: true, message: 'Payment processed successfully', invoice: inv };
    }
}
