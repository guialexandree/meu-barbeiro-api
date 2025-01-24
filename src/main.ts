import 'module-alias/register'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.ts';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe())

  app.use(morgan('dev'))

  const config = new DocumentBuilder()
    .setTitle('Barbearia API')
    .setDescription('API de gereciamento do sistema para barbearias')
    .setVersion('1.0')
    .addTag('barber')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
