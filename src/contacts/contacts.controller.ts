import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { ContactsService }    from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsSvc: ContactsService) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.contactsSvc.create(dto);
  }

  @Get()
  findAll() {
    return this.contactsSvc.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactsSvc.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactsSvc.remove(id);
  }
}
