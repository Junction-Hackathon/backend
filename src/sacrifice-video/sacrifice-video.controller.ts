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
import { AcessTokenGuard } from 'src/authentication/guards/access-token.guard';
import { UploadVideoDto } from './dtos/req/upload-vid.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { USER } from 'src/authentication/decorators/user.decorartor';
import { UserRoleGuard } from 'src/authentication/guards/userRole.Guard';

@UseGuards( AcessTokenGuard,UserRoleGuard)
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
  @UseInterceptors(FileInterceptor('video'))
  @Post()
  startProcessingVideo(
    @UploadedFile() file: Express.Multer.File,
    @USER('id') userId: string,
    @Body() data: UploadVideoDto,
  ) {
    return this.sacrificeVideoService.startAiProcessing(file, userId, data);
  }
}
