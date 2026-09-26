"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const invoice_schema_1 = require("./schemas/invoice.schema");
let InvoicesController = class InvoicesController {
    invoiceModel;
    constructor(invoiceModel) {
        this.invoiceModel = invoiceModel;
    }
    async create(createDto) {
        const inv = new this.invoiceModel(createDto);
        return inv.save();
    }
    async findAll(req) {
        if (req.user && req.user.role === 'client') {
            return this.invoiceModel.find({ clientId: req.user.userId }).sort({ createdAt: -1 }).exec();
        }
        return this.invoiceModel.find().sort({ createdAt: -1 }).exec();
    }
    async findOne(id) {
        return this.invoiceModel.findById(id).exec();
    }
    async update(id, updateDto) {
        return this.invoiceModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }
    async delete(id) {
        return this.invoiceModel.findByIdAndDelete(id).exec();
    }
    async pay(id) {
        const inv = await this.invoiceModel.findById(id);
        if (!inv)
            return { error: 'Invoice not found' };
        inv.status = 'paid';
        await inv.save();
        return { success: true, message: 'Payment processed successfully', invoice: inv };
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create an invoice (Admin/Lawyer only)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get invoices (filtered by client if role is client)' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get invoice by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an invoice' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an invoice' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/pay'),
    (0, swagger_1.ApiOperation)({ summary: 'Simulate Payment Processing' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "pay", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, swagger_1.ApiTags)('Invoices / Payments'),
    (0, common_1.Controller)('api/v1/invoices'),
    __param(0, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InvoicesController);
//# sourceMappingURL=invoices.controller.js.map