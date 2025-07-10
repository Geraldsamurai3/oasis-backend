// src/users/users.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard }     from '../auth/guards/jwt-auth.guard';
import { UsersService }     from './users.service';
import { RegisterUserDto }  from '../auth/dto/register-user.dto';
import { UpdateUserDto }    from './dto/update-user.dto';
import { BlockGuard } from 'src/auth/guards/block.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersSvc: UsersService) {}

  @Post()
  create(@Body() dto: RegisterUserDto) {
    return this.usersSvc.create(dto);
  }

  @Get()
  findAll() {
    return this.usersSvc.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersSvc.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersSvc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersSvc.remove(id);
  }

  @UseGuards(BlockGuard)
 @Put(':id/block')
  async blockUser(@Param('id') id: number) {
    const updated = await this.usersSvc.toggleBlockUser(id);
    return {
      message: `Usuario ${updated.isBlocked ? 'bloqueado' : 'desbloqueado'}`,
      user: updated,
    };
  }
}
