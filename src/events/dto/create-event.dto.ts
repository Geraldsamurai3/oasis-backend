// src/events/dto/create-event.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty() @IsString() @MaxLength(150)
  title: string;

  @IsNotEmpty() @IsString()
  description: string;

  @IsNotEmpty() @IsString() @MaxLength(100)
  location: string;

  @IsNotEmpty() @IsDateString()
  date: string;
}
