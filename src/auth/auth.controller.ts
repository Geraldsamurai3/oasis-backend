// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService }            from './auth.service';
import { RegisterUserDto }        from './dto/register-user.dto';
import { LoginDto }               from './dto/login.dto';
import { Public }                 from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSvc: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    const user = await this.authSvc.register(dto);
    const {
      id,
      email,
      firstName,
      lastName,
      secondLastName,
      phone,
      role,
      createdAt,
    } = user;
    return {
      message: 'Usuario registrado',
      data: { id, email, firstName, lastName, secondLastName, phone, role, createdAt },
    };
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authSvc.login(dto);
  }
}
