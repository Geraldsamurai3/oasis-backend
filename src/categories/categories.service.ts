import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  create(dto: CreateCategoryDto) {
    const cat = this.repo.create(dto);
    return this.repo.save(cat);
  }

  findAll() {
    return this.repo.find({ relations: ['items'] });
  }

  async findOne(id: number) {
    const cat = await this.repo.findOne({ where: { id }, relations: ['items'] });
    if (!cat) throw new NotFoundException(`Categoría id=${id} no encontrada`);
    return cat;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Categoría id=${id} no encontrada`);
    return { deleted: true };
  }
}
