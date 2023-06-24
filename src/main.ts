import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const swagger = new DocumentBuilder()
    .setTitle('Url shortener services')
    .setDescription('Rest api for url shortener project')
    .setVersion(config.get<string>('SWAGGER_VERSION'))
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('doc', app, document);

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(config.get<number>('PORT'));
}
bootstrap();
