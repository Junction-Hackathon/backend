import {
  ClientProxy,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { videoDoneProcessingDto } from './dtos/video-process-done.dto';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import { videoProcessorName } from 'src/sacrifice-video/constants';

export class AiVideoProcessorHandler {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(videoProcessorName) private readonly kafka: ClientProxy,
  ) {}
  @MessagePattern('video.process.done')
  async handleVideoDoneProcessing(
    @Payload() doneProcessPayload: videoDoneProcessingDto,
    @Ctx() context: KafkaContext,
  ) {
    const validatedData = plainToClass(
      videoDoneProcessingDto,
      doneProcessPayload,
    );
    if (!validatedData) {
    }
    const updatedVideo = await this.prismaService.sacrificeVideo.update({
      where: {
        id: validatedData.videoId,
      },
      data: {
        blurUrl: validatedData.blurUrl,
        url: validatedData.enhancedUrl,
      },
    });
    this.kafka.emit('notification.send', {
      //TODO Fill payload later
    });
  }
  @MessagePattern('video.process.error')
  handleVideoFailure(@Ctx() ctx: KafkaContext) {
    console.dir(ctx, 4);
  }
}
