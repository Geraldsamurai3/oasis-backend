import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
    private readonly emitter: EventEmitter2,
  ) {}

  async create(dto: CreateProjectDto) {
    const project = this.repo.create(dto);
    const saved = await this.repo.save(project);
    this.emitter.emit('project.created', saved);
    return saved;
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const project = await this.repo.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Proyecto id=${id} no encontrado`);
    return project;
  }

  async update(id: number, dto: UpdateProjectDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Proyecto id=${id} no encontrado`);
    }
    return { deleted: true };
  }
}
