import { Inject, Injectable } from '@nestjs/common';

import { Multer } from 'multer';
import { videoProcessorName } from './constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SacrificeVideoService {
  constructor(
    @Inject(videoProcessorName) private readonly kafkaProducer: ClientProxy,
  ) {}
  startAiProcessing(video: Express.Multer.File) {
    //save into db
    this.kafkaProducer.emit('video.process.start', video);
  }
}
