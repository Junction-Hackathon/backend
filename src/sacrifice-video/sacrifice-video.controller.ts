import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SacrificeVideoService } from './sacrifice-video.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('sacrifice-video')
export class SacrificeVideoController {
  constructor(private readonly sacrificeVideoService: SacrificeVideoService) {}
  @UseInterceptors(FileInterceptor('video'))
  @Post()
  startProcessingVideo(@UploadedFile() file: Express.Multer.File) {
    return this.sacrificeVideoService.startAiProcessing(file)
  }
}
