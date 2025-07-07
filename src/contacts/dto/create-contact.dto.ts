// src/contacts/dto/create-contact.dto.ts
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { ContactReason } from '../entities/contact.entity'

export class CreateContactDto {
  @IsNotEmpty() @IsString() @MaxLength(100)
  firstName: string

  @IsNotEmpty() @IsString() @MaxLength(100)
  lastName: string

  @IsEmail()
  email: string

  @IsOptional() @IsString() @MaxLength(20)
  phone?: string

  @IsEnum(ContactReason)
  reason: ContactReason

  @IsNotEmpty() @IsString() @MaxLength(2000)
  message: string
}
