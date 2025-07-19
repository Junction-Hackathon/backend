import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SacrificeVideoService } from './sacrifice-video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AcessTokenGuard } from 'src/authentication/guards/access-token.guard';
import { UploadVideoDto } from './dtos/req/upload-vid.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { USER } from 'src/authentication/decorators/user.decorartor';
import { UserRoleGuard } from 'src/authentication/guards/userRole.Guard';
import { memoryStorage } from 'multer';

@UseGuards(AcessTokenGuard)
@Controller('sacrifice-video')
export class SacrificeVideoController {
  constructor(private readonly sacrificeVideoService: SacrificeVideoService) {}

  @ApiOperation({
    description: 'Upload file once internet is on',
  })
  @ApiOkResponse({
    description: 'A job id and a succes note',
  })
  @ApiBody({
    type: UploadVideoDto,
  })
  @UseInterceptors(FileInterceptor('video', { storage: memoryStorage() }))
  @Post()
  startProcessingVideo(
    @UploadedFile() video: Express.Multer.File,
    @USER('id') userId: string,
    @Body() data: UploadVideoDto,
  ) {
    if (!video) {
      throw new BadRequestException('no file was uploaded');
    }
    return this.sacrificeVideoService.startAiProcessing(video, userId, data);
  }
}
