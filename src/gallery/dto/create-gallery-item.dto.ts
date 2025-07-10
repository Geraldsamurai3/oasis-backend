import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsOptional,
  MaxLength,
  IsInt,
} from 'class-validator';
import { Type }          from 'class-transformer';

export class CreateGalleryItemDto {

   @IsOptional()
    @IsString()
  mediaUrl?: string;

  @Type(() => Number)      // transforma el valor string → number
  @IsInt({ message: 'categoryId debe ser un número entero' })
  categoryId: number;
}
