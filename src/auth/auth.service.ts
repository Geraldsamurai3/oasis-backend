// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository }                 from '@nestjs/typeorm';
import { Repository }                       from 'typeorm';
import { JwtService }                       from '@nestjs/jwt';
import * as bcrypt                          from 'bcrypt';

import { User }                             from './entities/user.entity';
import { RegisterUserDto }                  from './dto/register-user.dto';
import { LoginDto }                         from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtSvc: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<User> {
    // 1) Hasheamos la contraseña
    const hash = await bcrypt.hash(dto.password, 10);

    // 2) Instanciamos manualmente la entidad
    const user = new User();
    user.email           = dto.email;
    user.passwordHash    = hash;
    user.firstName       = dto.firstName;
    user.lastName        = dto.lastName;
    user.secondLastName  = dto.secondLastName;
    user.phone           = dto.phone ;
    // role e isBlocked usarán el default de la entidad

    // 3) Guardamos y devolvemos el único User
    return this.usersRepo.save(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { sub: user.id, role: user.role };
    return { accessToken: this.jwtSvc.sign(payload) };
  }
}
