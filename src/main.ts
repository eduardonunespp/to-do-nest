import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Todo Api Documentation')
    .setDescription('Todo Api Documentation')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',

        name: 'JWT',
        description: 'Enter with token',
        in: 'header'
      },
      'KEY_AUTH'
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT, '0.0.0.0');
}

bootstrap();
