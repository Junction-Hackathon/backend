import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationStatus } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        receiverId: createNotificationDto.receiverId,
        title: createNotificationDto.title,
        content: createNotificationDto.content,
        status: createNotificationDto.status ?? NotificationStatus.pending,
      },
    });
  }

  async findAll(params?: { skip?: number; take?: number }) {
    return this.prisma.notification.findMany({
      skip: params?.skip,
      take: params?.take,
      orderBy: { createdAt: 'desc' },
    });
  }

 

  async remove(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return this.prisma.notification.delete({
      where: { id },
    });
  }

  async getUserNotifications(
    userId: string,
    params?: { skip?: number; take?: number }
  ) {
    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { receiverId: userId },
        skip: params?.skip,
        take: params?.take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count({
        where: { receiverId: userId },
      }),
    ]);
    return {
      data: notifications,
      total,
      skip: params?.skip ?? 0,
      take: params?.take ?? 10,
    };
  }

  async setRead(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return this.prisma.notification.update({
      where: { id },
      data: { status: NotificationStatus.sent },
    });
  }
}
