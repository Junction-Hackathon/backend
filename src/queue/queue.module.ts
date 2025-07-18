import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QUEUE_NAME } from 'src/common/constants/queues';
import { AppConfig } from 'src/config/interfaces/app-config.interface';
import { SearchModule } from 'src/search/search.module';
import { FileProcessor } from './file/file.processor';
import { NotificationProcessor } from './notification/notification.processor';
import { NotificationService } from 'src/notification/notification.service';
import { CloudinaryModuleWrapper } from 'src/cloudinary/cloudinary.module';
import { SacrificeVideoModule } from 'src/sacrifice-video/sacrifice-video.module';
import { AiVideoModule } from 'src/ai-video-processor/ai-video-upload.module';

@Module({
  imports: [
    CloudinaryModuleWrapper,
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

    AiVideoModule,
  ],

  providers: [FileProcessor, NotificationProcessor, NotificationService],
  exports: [BullModule],
})
export class QueueModule {}
