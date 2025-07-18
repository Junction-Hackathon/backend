import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'nestjs-cloudinary';

interface UploadingOptions {
  year: number;
}

@Injectable()
export class CloudinaryWrapperService {
  constructor(private readonly cloudService: CloudinaryService) {}

  async uploadImage(file: Express.Multer.File, options: UploadingOptions) {
   const folder = options.year.toString()

    return this.cloudService.uploadFile(file, {
      folder: folder || undefined,
    });
  }
}
