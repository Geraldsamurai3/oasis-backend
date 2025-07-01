import { IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateInscriptionDto {
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsOptional() @IsBoolean()
  wantsEvents?: boolean;

  @IsOptional() @IsBoolean()
  wantsMissions?: boolean;

  @IsOptional() @IsBoolean()
  wantsProjects?: boolean;
}
