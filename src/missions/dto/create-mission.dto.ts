import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayMinSize,
  MaxLength,
} from 'class-validator';
import { CreatePaymentAccountDto } from './create-payment-account.dto';

export class CreateMissionDto {
  @IsNotEmpty() @IsString() @MaxLength(150)
  title: string;

  @IsNotEmpty() @IsString()
  description: string;

  @IsNotEmpty() @IsString() @MaxLength(100)
  location: string;

  @ValidateNested({ each: true })
  @Type(() => CreatePaymentAccountDto)
  @ArrayMinSize(1)
  accounts: CreatePaymentAccountDto[];
}
