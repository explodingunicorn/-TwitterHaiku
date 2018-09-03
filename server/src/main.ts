import * as fastify from 'fastify';
import { NestFactory, FastifyAdapter } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(path.resolve(__dirname + '/build'));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
