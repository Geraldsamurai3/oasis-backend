import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PaymentAccount } from '../shared/entities/payment-account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, PaymentAccount]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
