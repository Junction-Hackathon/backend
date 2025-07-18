import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { USER } from 'src/authentication/decorators/user.decorartor';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_NAME } from 'src/common/constants/queues';
import { NOTIFICATION_JOBS } from 'src/common/constants/jobs';
import { Observable, interval, map, switchMap } from 'rxjs';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    @InjectQueue(QUEUE_NAME.NOTIFICATION)
    private readonly notificationQueue: Queue,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({
    status: 201,
    description: 'Notification created successfully.',
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Post('send')
  @ApiOperation({ summary: 'Send a notification using BullMQ' })
  @ApiResponse({
    status: 201,
    description: 'Notification enqueued successfully.',
  })
  async sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    await this.notificationQueue.add(
      NOTIFICATION_JOBS.SEND_NOTIFICATION,
      createNotificationDto,
    );
    return { success: true, message: 'Notification enqueued successfully.' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of records to skip',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of records to take',
  })
  @ApiResponse({ status: 200, description: 'List of notifications.' })
  findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    return this.notificationService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  @Get('user')
  @ApiOperation({ summary: 'Get notifications for the current user' })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of records to skip',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of records to take',
  })
  @ApiResponse({ status: 200, description: 'List of user notifications.' })
  getUserNotifications(
    @USER('id') userId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.notificationService.getUserNotifications(userId, {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read (sent)' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification marked as read.' })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  setRead(@Param('id') id: string) {
    return this.notificationService.setRead(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({
    status: 200,
    description: 'Notification deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  remove(@Param('id') id: string) {
    return this.notificationService.remove(id);
  }

  @Sse('sse')
  @ApiOperation({ summary: 'SSE endpoint for real-time notifications' })
  sse(@USER('id') userId: string): Observable<MessageEvent> {
    return interval(5000).pipe(
      switchMap(() => this.notificationService.getUserNotifications(userId)),
      map(
        (notifications) =>
          ({
            data: notifications.data,
            type: 'notification',
          }) as MessageEvent,
      ),
    );
  }
}
