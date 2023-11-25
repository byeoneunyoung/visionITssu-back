import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as fs from 'fs';
import * as https from 'https';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Express } from 'express';
import * as path from 'path'; // Import the path module

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/devy.me/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/devy.me/cert.pem'),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });



  app.enableCors({
    origin: '*',
  });

  app.useStaticAssets(join(__dirname, '../..', 'static'));
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  // await app.listen(5000, '0.0.0.0', () => {});
  await app.listen(5002);
}
bootstrap();
