import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { videoProcessorName } from 'src/sacrifice-video/constants';
import { AiVideoProcessorHandler } from './ai-video-upload';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: videoProcessorName,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'VID_CLIENT',
            brokers: ['kafka:9092'],
          },

          consumer: {
            allowAutoTopicCreation: true,
            groupId: 'VID_CONSUMERS',
          },
        },
      },
    ]),
  ],
  providers: [AiVideoProcessorHandler],
  exports: [ClientsModule, AiVideoProcessorHandler],
})
export class AiVideoModule {}
