
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs'; // ← do zapisu pliku
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  // Walidacja globalna
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // CORS
  app.enableCors({
    origin: '*',
  });

  // ✅ Konfiguracja Swagger + JWT
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation with JWT authentication')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // <- identyfikator do @ApiBearerAuth()
    )
    .build();

  // Tworzenie dokumentu OpenAPI
  const document = SwaggerModule.createDocument(app, config);

  // Interfejs Swagger UI pod /api
  SwaggerModule.setup('api', app, document);

  // 📄 Zapis dokumentacji do pliku JSON
  writeFileSync('./swagger-auth.json', JSON.stringify(document, null, 2));

  const port = 3005;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
  Logger.log(`📄 Swagger docs available at: http://localhost:${port}/api`);
  Logger.log(`🧾 Swagger file saved as: swagger-auth.json`);
}

bootstrap();
