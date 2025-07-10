import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { FileInterceptor }   from '@nestjs/platform-express'
import { v2 as Cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { EventsService }     from './events.service'
import { CreateEventDto }    from './dto/create-event.dto'
import { UpdateEventDto }    from './dto/update-event.dto'

// 1) Creamos el storage, casteando params a any
const storage = new CloudinaryStorage({
  cloudinary: Cloudinary,
  params: {
    folder:          'events',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  } as any,
})

@Controller('events')
export class EventsController {
  constructor(private readonly eventsSvc: EventsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(
    // 2) Express.Multer.File ya existe tras instalar @types/multer
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateEventDto,
  ) {
    const imageUrl = file?.path ?? null
    return this.eventsSvc.create({ ...dto, imageUrl })
  }

  @Get()
  findAll() {
    return this.eventsSvc.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsSvc.findOne(id)
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateEventDto,
  ) {
    const updateData: any = { ...dto }
    if (file) updateData.imageUrl = file.path
    return this.eventsSvc.update(id, updateData)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsSvc.remove(id)
  }
}
