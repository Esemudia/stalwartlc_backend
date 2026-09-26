import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoicesController } from './invoices.controller';
import { Invoice, InvoiceSchema } from './schemas/invoice.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }])],
    controllers: [InvoicesController],
})
export class InvoicesModule { }
