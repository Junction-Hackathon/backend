import {  Module } from '@nestjs/common';
import { SacrificeVideoService } from './sacrifice-video.service';
import { SacrificeVideoController } from './sacrifice-video.controller';

import { QueueModule } from 'src/queue/queue.module';
@Module({
  imports: [QueueModule],
  controllers: [SacrificeVideoController],
  providers: [SacrificeVideoService],
})
export class SacrificeVideoModule {}
