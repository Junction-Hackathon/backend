import {  Injectable, Logger } from '@nestjs/common';

import { InjectQueue } from '@nestjs/bullmq';
import { QUEUE_NAME } from 'src/common/constants/queues';
import { Queue } from 'bullmq';
import { FILE_JOBS } from 'src/common/constants/jobs';
import { SendFileDto } from 'src/queue/file/dtos/send-file.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadVideoDto } from './dtos/req/upload-vid.dto';

@Injectable()
export class SacrificeVideoService {
  logger=new Logger(SacrificeVideoService.name)
  constructor(
    @InjectQueue(QUEUE_NAME.FILE) private readonly FileQueue: Queue,
    private readonly prismaService: PrismaService,
  ) {}
  async startAiProcessing(
    video: Express.Multer.File,
    slayerId: string,

    { sacrificeId }: UploadVideoDto,
  ) {
    //save into db
    const updatedSac = await this.prismaService.sacrifice.update({
      where: {
        id: sacrificeId,
        sacrificedById: slayerId,
      },
      data: {
        status: 'sacrificed',
        slayedAt: new Date(),
      },
      include: {
        sacrificer: true,
        donor: true,
      },
    });
    this.logger.log(video)
    const payload: SendFileDto = {
      fileBuffer: video.buffer.toString('base64'),
      year: new Date().getFullYear(),
      slayer: updatedSac.sacrificer!,
      donor: updatedSac.donor,
    };

    const job = await this.FileQueue.add(FILE_JOBS.UPLOAD_SAC_VID, payload);
    return {
      jobId: job.id,
      message: 'Queued Succefully',
    };
  }
}
