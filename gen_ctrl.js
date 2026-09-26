const fs = require('fs');
const path = require('path');

const modules = {
  'approvals': 'Approval',
  'audit': 'AuditLog',
  'communications': 'Message',
  'document-versions': 'DocumentVersion',
  'events': 'Event',
  'notifications': 'Notification',
  'roles': 'Role',
  'tasks': 'Task',
  'verification': 'VerificationRecord'
};

for (const [folder, modelName] of Object.entries(modules)) {
    const className = folder.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Controller';
    const filePath = path.join(__dirname, 'src', folder, `${folder}.controller.ts`);
    
    // Check what the schema file is
    const schemasDir = path.join(__dirname, 'src', folder, 'schemas');
    if (!fs.existsSync(schemasDir)) continue;
    const schemaFile = fs.readdirSync(schemasDir).find(f => f.endsWith('.schema.ts'));
    if (!schemaFile) continue;
    const schemaImportPath = `./schemas/${schemaFile.replace('.ts', '')}`;
    
    const content = `import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ${modelName} } from '${schemaImportPath}';

@Controller('api/v1/${folder}')
export class ${className} {
    constructor(@InjectModel(${modelName}.name) private readonly model: Model<${modelName}>) { }

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
`;
    fs.writeFileSync(filePath, content);
    
    // Now inject it into the module
    const moduleFile = path.join(__dirname, 'src', folder, `${folder}.module.ts`);
    if (fs.existsSync(moduleFile)) {
        let modContent = fs.readFileSync(moduleFile, 'utf8');
        if (!modContent.includes(className)) {
            modContent = `import { ${className} } from './${folder}.controller';\n` + modContent;
            modContent = modContent.replace('controllers: []', `controllers: [${className}]`);
            fs.writeFileSync(moduleFile, modContent);
        }
    }
}
console.log('✅ Generated complete CRUD controllers for remaining backend modules!');
