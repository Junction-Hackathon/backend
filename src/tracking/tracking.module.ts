import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { TrackingGateway } from './tracking.gateway';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  controllers: [TrackingController],
  providers: [TrackingService, TrackingGateway],
  imports: [RedisModule],
})
export class TrackingModule {}
