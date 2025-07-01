import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }             from '@nestjs/typeorm';
import { Repository }                   from 'typeorm';

import { Contact }        from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly repo: Repository<Contact>,
  ) {}

  create(dto: CreateContactDto) {
    const contact = this.repo.create(dto);
    return this.repo.save(contact);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const contact = await this.repo.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contacto con id=${id} no encontrado`);
    }
    return contact;
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Contacto con id=${id} no encontrado`);
    }
    return { deleted: true };
  }
}
