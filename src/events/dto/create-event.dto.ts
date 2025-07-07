// src/events/dto/create-event.dto.ts
import {
  IsString,
  IsOptional,
  IsDateString,
  Matches,
  MaxLength,
  IsNotEmpty,
  IsUrl
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty({ message: 'El titulo del evento es obligatorio' }) @IsString() @MaxLength(150)
  title: string;

  @IsNotEmpty({ message: 'La descripcion del evento es obligatoria' }) @IsString()
  description: string;

  @IsNotEmpty({ message: 'La localizacion del evento es obligatoria' }) @IsString() @MaxLength(100)
  location: string;

  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' }) @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;            // "YYYY-MM-DD" o null

  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'Hora inicio debe tener formato HH:MM',
  })
  startTime: string;          // "HH:MM"

  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'Hora fin debe tener formato HH:MM',
  })
  endTime?: string;            // "HH:MM"

  @IsOptional()
  @IsString()
  imageUrl?: string;

   @IsOptional()
  @IsUrl({}, { message: 'El enlace adicional debe ser una URL válida' })
  @MaxLength(500, { message: 'El enlace adicional no puede exceder 500 caracteres' })
  additionalLink?: string;
}
