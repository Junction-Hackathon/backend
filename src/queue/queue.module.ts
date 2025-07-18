import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QUEUE_NAME } from 'src/common/constants/queues';
import { AppConfig } from 'src/config/interfaces/app-config.interface';
import { SearchModule } from 'src/search/search.module';
import { FileProcessor } from './file/file.processor';
import { CloudinaryWrapperService } from 'src/cloudinary/cloudinary.service';
import { NotificationProcessor } from './notification/notification.processor';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const redisHost = configService.get<AppConfig['redis']['host']>(
          'redis.host',
          'localhost',
        );
        const redisPort = configService.get<AppConfig['redis']['port']>(
          'redis.port',
          6379,
        );
        const redisUrl = `redis://${redisHost}:${redisPort}`;
        return {
          connection: {
            host: redisHost,
            port: redisPort,
            url: redisUrl,
            db: 3, // Default database
          },
        };
      },

      inject: [ConfigService],
    }),
    BullModule.registerQueue(
      ...Object.values(QUEUE_NAME).map((queueName) => ({
        name: queueName,
      })),
    ),
    SearchModule,
  ],
  providers: [FileProcessor, CloudinaryWrapperService, NotificationProcessor, NotificationService],
})
export class QueueModule {}
