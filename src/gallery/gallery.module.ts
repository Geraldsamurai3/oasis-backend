import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryItem } from './entities/gallery-item.entity';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GalleryItem]),
    CategoriesModule,
  ],
  providers: [GalleryService],
  controllers: [GalleryController],
})
export class GalleryModule {}
