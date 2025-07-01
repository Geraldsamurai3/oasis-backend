import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { MissionsService } from './missions.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsSvc: MissionsService) {}

  @Post()
  create(@Body() dto: CreateMissionDto) {
    return this.missionsSvc.create(dto);
  }

  @Get()
  findAll() {
    return this.missionsSvc.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.missionsSvc.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMissionDto,
  ) {
    return this.missionsSvc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.missionsSvc.remove(id);
  }
}
