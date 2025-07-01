// src/shared/shared.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentAccount } from './entities/payment-account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentAccount]),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class SharedModule {}
