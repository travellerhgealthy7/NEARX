import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import type { Request, Response } from 'express';
import express from 'express';
import { AppModule } from '../src/app.module';

const server = express();
const adapter = new ExpressAdapter(server);
let app: INestApplication;

async function createNestApp() {
  app = await NestFactory.create(AppModule, adapter, { logger: false });
  
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  
  app.setGlobalPrefix('api');
  await app.init();
  
  return server;
}

let serverPromise: Promise<express.Express>;

export default async (req: Request, res: Response) => {
  if (!serverPromise) {
    serverPromise = createNestApp();
  }
  
  const handler = await serverPromise;
  return handler(req, res);
};
