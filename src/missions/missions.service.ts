import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Mission } from './entities/mission.entity';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private readonly repo: Repository<Mission>,
    private readonly emitter: EventEmitter2,
  ) {}

  async create(dto: CreateMissionDto) {
    const mission = this.repo.create(dto);
    const saved = await this.repo.save(mission);
    this.emitter.emit('mission.created', saved);
    return saved;
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const mission = await this.repo.findOne({ where: { id } });
    if (!mission) throw new NotFoundException(`Misión id=${id} no encontrada`);
    return mission;
  }

  async update(id: number, dto: UpdateMissionDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Misión id=${id} no encontrada`);
    }
    return { deleted: true };
  }
}
