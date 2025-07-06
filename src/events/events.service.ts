// src/events/events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }               from '@nestjs/typeorm';
import { Repository }                     from 'typeorm';

import { Event }           from './entities/event.entity';
import { CreateEventDto }  from './dto/create-event.dto';
import { UpdateEventDto }  from './dto/update-event.dto';  // <- importar

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  create(dto: CreateEventDto) {
    const ev = this.repo.create(dto);
    return this.repo.save(ev);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const ev = await this.repo.findOne({ where: { id } });
    if (!ev) throw new NotFoundException(`Evento con id=${id} no encontrado`);
    return ev;
  }

  // Cambiado dto: CreateEventDto → UpdateEventDto
  async update(id: number, dto: UpdateEventDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Evento con id=${id} no encontrado`);
    }
    return { deleted: true };
  }
}
