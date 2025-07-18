import { forwardRef, Module } from '@nestjs/common';
import { SacrificeVideoService } from './sacrifice-video.service';
import { SacrificeVideoController } from './sacrifice-video.controller';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { videoProcessorName } from './constants';
import { QueueModule } from 'src/queue/queue.module';
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
    forwardRef(() => QueueModule),
  ],
  controllers: [SacrificeVideoController],
  providers: [SacrificeVideoService],
  exports: [ClientsModule],
})
export class SacrificeVideoModule {}
