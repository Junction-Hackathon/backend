import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { QUEUE_NAME } from 'src/common/constants/queues';
import { NOTIFICATION_JOBS } from 'src/common/constants/jobs';
import { NotificationService } from 'src/notification/notification.service';
import { SendNotificationDto } from './dtos/send-notification.dto';
import { Job } from 'bullmq';

@Processor(QUEUE_NAME.NOTIFICATION)
export class NotificationProcessor extends WorkerHost {
  logger = new Logger(NotificationProcessor.name);
  constructor(private readonly notificationService: NotificationService) {
    super();
  }
  async process(job: Job<SendNotificationDto>): Promise<any> {
    this.logger.log('Processing job: ' + job.name);
    switch (job.name) {
      case NOTIFICATION_JOBS.SEND_NOTIFICATION:
        this.logger.log('Sending notification');
        return this.handleSendNotificationJob(job as Job<SendNotificationDto>);
      default:
        return Promise.resolve();
    }
  }
  async handleSendNotificationJob(job: Job<SendNotificationDto>): Promise<any> {
    const { receiverId, title, content, status } = job.data;
    return this.notificationService.create({ receiverId, title, content, status });
  }
} 