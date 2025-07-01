import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  IsInt,
} from 'class-validator';

export class CreateGalleryItemDto {
  @IsNotEmpty() @IsString() @MaxLength(150)
  title: string;

  @IsNotEmpty() @IsString()
  description: string;

  @IsNotEmpty() @IsUrl()
  mediaUrl: string;

  @IsInt({ message: 'categoryId debe ser un entero' })
  categoryId: number;
}
