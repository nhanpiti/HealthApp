import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as compression from 'compression';
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  });

  const config = new DocumentBuilder()
    .setTitle('HealthApp')
    .setDescription('The Health App API description')
    .setVersion('1.0')
    .addTag('Health App')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(compression());

  await app.listen(3000);
}
bootstrap();
