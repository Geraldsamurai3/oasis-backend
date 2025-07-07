// src/contacts/dto/update-status.dto.ts
import { IsEnum } from 'class-validator'
import { ContactStatus } from '../entities/contact.entity'

export class UpdateStatusDto {
  @IsEnum(ContactStatus)
  status: ContactStatus
}
