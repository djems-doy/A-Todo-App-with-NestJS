import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    "origin":"*",
    "allowedHeaders":"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    "methods":"GET, POST, PUT, DELETE, PATCH, OPTIONS"
  });

  app.useGlobalPipes(new ValidationPipe ({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  await app.listen(3000);
}
bootstrap();
