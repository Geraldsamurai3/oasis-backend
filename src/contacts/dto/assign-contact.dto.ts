// src/contacts/dto/assign-contact.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class AssignContactDto {
  @IsNotEmpty() @IsString() @MaxLength(100)
  assignedTo: string
}
