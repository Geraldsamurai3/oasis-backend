// src/contacts/contacts.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common'
import { ContactsService }       from './contacts.service'
import { CreateContactDto }      from './dto/create-contact.dto'
import { UpdateStatusDto } from './dto/update-contact.dto'
import { AssignContactDto }      from './dto/assign-contact.dto'

@Controller('contacts')
export class ContactsController {
  constructor(private readonly svc: ContactsService) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.svc.create(dto)
  }

  @Get()
  findAll() {
    return this.svc.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id)
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.svc.updateStatus(id, dto)
  }

  @Patch(':id/assign')
  assign(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignContactDto,
  ) {
    return this.svc.assign(id, dto)
  }
}
