import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend first so all responses include CORS headers
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
  });

  // Increase body size limit for large payload uploads
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Global validation pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Stalwart Law Consult API')
    .setDescription('API for managing cases, documents, invoices, and clients.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Prefix all routes manually via controllers instead to avoid double counting
  // app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
