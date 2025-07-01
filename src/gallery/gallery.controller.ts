import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly gallerySvc: GalleryService) {}

  @Post()
  create(@Body() dto: CreateGalleryItemDto) {
    return this.gallerySvc.create(dto);
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
