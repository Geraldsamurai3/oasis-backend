// src/inscriptions/inscriptions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '../mailer/mailer.module';

import { Inscription } from './entities/inscription.entity';
import { InscriptionsService } from './inscriptions.service';
import { InscriptionsController } from './inscriptions.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inscription]),
    MailerModule,
  ],
  providers: [InscriptionsService, NotificationsService],
  controllers: [InscriptionsController],
  exports: [InscriptionsService],
})
export class InscriptionsModule {}
