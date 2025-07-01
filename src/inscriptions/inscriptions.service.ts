import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inscription } from './entities/inscription.entity';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';

@Injectable()
export class InscriptionsService {
  constructor(
    @InjectRepository(Inscription)
    private readonly repo: Repository<Inscription>,
  ) {}

  async create(dto: CreateInscriptionDto) {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('El correo ya está inscrito');
    const ins = this.repo.create(dto);
    return this.repo.save(ins);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const ins = await this.repo.findOne({ where: { id } });
    if (!ins) throw new NotFoundException(`Inscripción id=${id} no encontrada`);
    return ins;
  }

  async update(id: number, dto: UpdateInscriptionDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Inscripción id=${id} no encontrada`);
    return { deleted: true };
  }

  // Para notificaciones: filtra suscriptores según el flag
  findSubscribers(type: 'wantsEvents' | 'wantsMissions' | 'wantsProjects') {
    return this.repo.find({ where: { [type]: true } });
  }
}
