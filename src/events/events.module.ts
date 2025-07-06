import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event }             from './entities/event.entity';
import { EventsService }     from './events.service';
import { EventsController }  from './events.controller';
import { CloudinaryModule }  from '../cloudinary/cloudinary.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    CloudinaryModule,               
  ],
  providers: [
    EventsService,
    CloudinaryService,            
  ],
  controllers: [
    EventsController,
  ],
})
export class EventsModule {}
