import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { QUEUE_NAME } from 'src/common/constants/queues';
import { FILE_JOBS } from 'src/common/constants/jobs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SendFileDto } from './dtos/send-file.dto';
import { Job } from 'bullmq';
import { ClientProxy } from '@nestjs/microservices';
import { topics, videoProcessorName } from 'src/sacrifice-video/constants';

@Injectable()
@Processor(QUEUE_NAME.FILE)
export class FileProcessor extends WorkerHost {
  logger = new Logger(FileProcessor.name);
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @Inject(videoProcessorName) private readonly kafkaProducer: ClientProxy,
  ) {
    super();
  }
  async process(job: Job<SendFileDto>): Promise<any> {
    this.logger.log('Processing job: ' + job.name);
    switch (job.name) {
      case FILE_JOBS.UPLOAD_SAC_VID:
        this.logger.log('Uploading file');
        return this.handleSendFileJob(job);
      default:
        return Promise.resolve();
    }
  }
  async handleSendFileJob(job: Job<SendFileDto>): Promise<any> {
    this.logger.log('Starting file Upload');
    const { fileBuffer, year } = job.data;
    const data = await this.cloudinaryService.uploadImage(fileBuffer, { year });
    this.logger.log('Uploaded succefully pushing to mq');
    return this.kafkaProducer.emit(topics.VIDEO_START_PROCESS, {
      message: 'Video Uploaded succefully',
      videoMetadata: data,
      donor: job.data.donor,
      slayer: job.data.slayer,
      year,
    });
  }
}
