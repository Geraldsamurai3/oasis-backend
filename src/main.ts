// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule }    from './app.module';
import { DataSource }   from 'typeorm';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv      from 'dotenv';

dotenv.config();

async function ensureDatabaseExists() {
  // Configuración temporal para conectar al servidor
  const tmpDs = new DataSource({
    type:     'mariadb',
    host:     process.env.DB_HOST,
    port:     Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // omitimos database para conectar al servidor "maestro"
  });

  await tmpDs.initialize();

  // Crear la base de datos si no existe
  await tmpDs.query(`
    CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  await tmpDs.destroy();
}

async function bootstrap() {
  // 1) Crear base de datos si no existe
  await ensureDatabaseExists();

  // 2) Arrancar NestJS con AppModule
  const app = await NestFactory.create(AppModule);

  // 3) Habilitar validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // rechaza petición si hay propiedades extra
    transform: true,            // convierte tipos automáticamente (e.g. strings a números)
  }));

  // 4) Habilitar CORS para tu frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true, // si usas cookies httpOnly
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}/`);
}

bootstrap();
