// src/events/dto/update-event.dto.ts
import {
  IsString,
  IsOptional,
  IsDateString,
  Matches,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateEventDto {
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
  endDate?: string;

  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'Hora inicio debe tener formato HH:MM',
  })
  startTime: string;

  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'Hora fin debe tener formato HH:MM',
  })
  endTime?: string;
  
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
