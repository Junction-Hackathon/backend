import { Module } from '@nestjs/common';
import { SacrificeVideoService } from './sacrifice-video.service';
import { SacrificeVideoController } from './sacrifice-video.controller';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { videoProcessorName } from './constants';
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
            groupId: 'VID_CONSUMERS',
          },
        },
      },
    ]),
  ],
  controllers: [SacrificeVideoController],
  providers: [SacrificeVideoService],
})
export class SacrificeVideoModule {}
