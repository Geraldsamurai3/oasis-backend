// src/users/users.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository }  from '@nestjs/typeorm';
import { Repository }        from 'typeorm';
import * as bcrypt           from 'bcrypt';
import { User }              from 'src/auth/entities/user.entity';
import { RegisterUserDto }   from '../auth/dto/register-user.dto';
import { UpdateUserDto }     from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(dto: RegisterUserDto): Promise<User> {
    const exists = await this.repo.findOneBy({ email: dto.email });
    if (exists) throw new ConflictException('Email ya registrado');
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, passwordHash: hash });
    return this.repo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuario con id=${id} no encontrado`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  
  async toggleBlockUser(id: number): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuario id=${id} no encontrado`);
    user.isBlocked = !user.isBlocked;
    return this.repo.save(user);
  }
}
