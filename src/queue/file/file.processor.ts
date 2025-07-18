import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { QUEUE_NAME } from 'src/common/constants/queues';
import { FILE_JOBS } from 'src/common/constants/jobs';
import { CloudinaryWrapperService } from 'src/cloudinary/cloudinary.service';
import { SendFileDto } from './dtos/send-file.dto';
import { Job } from 'bullmq';

@Processor(QUEUE_NAME.FILE)
export class FileProcessor extends WorkerHost {
  logger = new Logger(FileProcessor.name);
  constructor(private readonly cloudinaryService: CloudinaryWrapperService) {
    super();
  }
  async process(job: Job<SendFileDto>): Promise<any> {
    this.logger.log('Processing job: ' + job.name);
    switch (job.name) {
      case FILE_JOBS.SEND_FILE:
        this.logger.log('Uploading file');
        return this.handleSendFileJob(job as Job<SendFileDto>);
      default:
        return Promise.resolve();
    }
  }
  async handleSendFileJob(job: Job<SendFileDto>): Promise<any> {
    const { file,year } = job.data;
    return this.cloudinaryService.uploadImage(file,{ year });
  }
} 
