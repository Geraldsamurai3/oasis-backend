// src/contacts/contacts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository }               from '@nestjs/typeorm'
import { Repository }                     from 'typeorm'
import { Contact, ContactStatus }         from './entities/contact.entity'
import { CreateContactDto }               from './dto/create-contact.dto'
import { UpdateStatusDto } from './dto/update-contact.dto'
import { AssignContactDto }               from './dto/assign-contact.dto'

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly repo: Repository<Contact>,
  ) {}

  create(dto: CreateContactDto) {
    const contact = this.repo.create(dto)
    return this.repo.save(contact)
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } })
  }

  async findOne(id: number) {
    const contact = await this.repo.findOne({ where: { id } })
    if (!contact) throw new NotFoundException(`Contacto ${id} no encontrado`)
    return contact
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    const contact = await this.findOne(id)
    contact.status = dto.status
    if (dto.status === ContactStatus.RESPONDIDO) {
      contact.respondedAt = new Date()
    }
    return this.repo.save(contact)
  }

  async assign(id: number, dto: AssignContactDto) {
    const contact = await this.findOne(id)
    contact.assignedTo = dto.assignedTo
    contact.status     = ContactStatus.EN_PROCESO
    return this.repo.save(contact)
  }
}
