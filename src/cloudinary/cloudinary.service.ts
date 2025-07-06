import { Injectable, Inject } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';
import { CLOUDINARY } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
  constructor(@Inject(CLOUDINARY) private readonly client: typeof Cloudinary) {}

  async uploadImage(filePath: string): Promise<string> {
    const { secure_url } = await this.client.uploader.upload(filePath, {
      folder: 'events',
      resource_type: 'image',
    });
    return secure_url;
  }
}
