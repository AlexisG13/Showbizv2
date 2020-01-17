import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Showbiz API')
    .setDescription('The Showbiz API for movie buys and rentals!')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users')
    .addTag('movies')
    .addTag('tags')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
