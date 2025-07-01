import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Mission } from './entities/mission.entity';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { PaymentAccount } from '../shared/entities/payment-account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mission, PaymentAccount]),
  ],
  providers: [MissionsService],
  controllers: [MissionsController],
})
export class MissionsModule {}
