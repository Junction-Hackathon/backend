import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from 'src/redis/redis.service';
import { Injectable } from '@nestjs/common';

@WebSocketGateway()
@Injectable()
export class TrackingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly redisService: RedisService) {}

  static getUserLocationKey(userId: string): string {
    return `user:${userId}:location`;
  }

  @SubscribeMessage('update_location')
  async handleUpdateLocation(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: string; location: { lat: number; lng: number } }
  ): Promise<void> {
    const redisKey = TrackingGateway.getUserLocationKey(payload.userId);
    await this.redisService.set(redisKey, payload.location, 300);

    this.server.emit('location_updated', {
      userId: payload.userId,
      location: payload.location,
    });
  }

  @SubscribeMessage('locationupdated')
  async handleLocationUpdated(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: string; location: { lat: number; lng: number } }
  ): Promise<void> {
    const redisKey = TrackingGateway.getUserLocationKey(payload.userId);
    await this.redisService.set(redisKey, payload.location, 300);
  }
}
