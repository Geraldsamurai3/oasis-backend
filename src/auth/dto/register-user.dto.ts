// src/auth/dto/register-user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(12, {
    message: 'La contraseña debe tener al menos 12 caracteres',
  })
  @Matches(/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+/, {
    message: 'La contraseña debe contener al menos un carácter especial',
  })
  password: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty({ message: 'El primer apellido es obligatorio' })
  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  secondLastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}
