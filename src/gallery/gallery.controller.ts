// src/gallery/gallery.controller.ts
import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as Cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import { GalleryService } from './gallery.service';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';

// configuramos el storage para Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: Cloudinary,
  params: {
    folder: 'galeria',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  } as any,
});

@Controller('gallery')
export class GalleryController {
  constructor(private readonly gallerySvc: GalleryService) {}

  // ahora esperamos un campo 'media' con la imagen
  @Post()
  @UseInterceptors(FileInterceptor('media', { storage }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateGalleryItemDto,
  ) {
    // CloudinaryStorage expone la URL en file.path
    const mediaUrl = file?.path;
    // delegamos al servicio
    return this.gallerySvc.create({ ...dto, mediaUrl });
  }

  @Get()
  findAll() {
    return this.gallerySvc.findAll();
  }

  @Get('category/:catId')
  findByCategory(@Param('catId', ParseIntPipe) catId: number) {
    return this.gallerySvc.findByCategory(catId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gallerySvc.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gallerySvc.remove(id);
  }
}
