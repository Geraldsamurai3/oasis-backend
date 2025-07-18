// src/cloudinary/cloudinary.provider.ts
import { v2 as cloudinary } from 'cloudinary';
import { Provider } from '@nestjs/common';

export const CLOUDINARY = 'CLOUDINARY';

export const CloudinaryProvider: Provider = {
  provide: CLOUDINARY,
  useFactory: () => {
    cloudinary.config({
      cloud_name:    process.env.CLOUDINARY_NAME,
      api_key:       process.env.CLOUDINARY_API_KEY,
      api_secret:    process.env.CLOUDINARY_API_SECRET,
    });
    return cloudinary;
  },
};
