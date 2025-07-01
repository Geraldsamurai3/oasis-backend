import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { AccountType } from '../../shared/entities/payment-account.entity';

export class CreatePaymentAccountDto {
  @IsEnum(['SINPE', 'BANK'])
  type: AccountType;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  sinpeNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  bankName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  bankAccountNumber?: string;
}
