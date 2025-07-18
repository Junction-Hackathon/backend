import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SacrificeVideoService } from './sacrifice-video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { AcessTokenGuard } from 'src/authentication/guards/access-token.guard';
import { User } from 'src/user/entities/user.entity';
import { USER } from 'src/authentication/decorators/user.decorartor';
import { UploadVideoDto } from './dtos/req/upload-vid.dto';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard, AcessTokenGuard)
@Controller('sacrifice-video')
export class SacrificeVideoController {
  constructor(private readonly sacrificeVideoService: SacrificeVideoService) {}
  @ApiOperation({
    description:"Upload file once internet is on"
  })
  @ApiOkResponse({
    description:"A job id and a succes note" 
  })
  @UseInterceptors(FileInterceptor('video', { storage: memoryStorage() }))
  @Post()
  startProcessingVideo(
    @UploadedFile() file: Express.Multer.File,
    @USER('id') userId: string,
    @Body() data: UploadVideoDto,
  ) {
    return this.sacrificeVideoService.startAiProcessing(file, userId, data);
  }
}
