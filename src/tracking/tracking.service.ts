import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SacrificeStatus } from '@prisma/client';

@Injectable()
export class TrackingService {
  constructor(private readonly prismaService: PrismaService) {}

  async startDelivery(sacrificeId: string): Promise<any> {
    const startDeliverySacrifice = await this.prismaService.sacrifice.update({
      where: { id: sacrificeId },
      data: { status: SacrificeStatus.onWay },
    });
    if (startDeliverySacrifice) throw new NotFoundException('the sacrefice not found')
    return { success: true, message: `Started delivery for ${sacrificeId}` };
  }

  async getTrackingsByStatus(
    sacrificeId: string,
    status: SacrificeStatus,
    page: number = 1,
    limit: number = 10
  ): Promise<any> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prismaService.sacrifice.findMany({
        where: { id: sacrificeId, status },
        skip,
        take: limit,
      }),
      this.prismaService.sacrifice.count({
        where: { id: sacrificeId, status },
      }),
    ]);
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async cancelDelivery(sacrificeId: string): Promise<any> {
    return await this.prismaService.sacrifice.update({where:{id:sacrificeId},data:{status:SacrificeStatus.cancelled}})
  }

  async getStatus(sacrificeId: string): Promise<any> {
    const sacrifice = await this.prismaService.sacrifice.findUnique({
      where: { id: sacrificeId },
      select: { id: true, status: true },
    });

    if (!sacrifice) {
      throw new NotFoundException('Sacrifice not found');
    }

    return {
      id: sacrifice.id,
      status: sacrifice.status,
    };
  }
}
