import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryItem } from './entities/gallery-item.entity';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryItem)
    private readonly repo: Repository<GalleryItem>,
    private readonly catSvc: CategoriesService,
  ) {}

  async create(dto: CreateGalleryItemDto) {
    const category = await this.catSvc.findOne(dto.categoryId);
    const item = this.repo.create({
      mediaUrl: dto.mediaUrl,
      category,
    });
    return this.repo.save(item);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findByCategory(catId: number) {
    await this.catSvc.findOne(catId);
    return this.repo.find({
      where: { category: { id: catId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`GalleryItem id=${id} no encontrado`);
    return item;
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`GalleryItem id=${id} no encontrado`);
    return { deleted: true };
  }
}
