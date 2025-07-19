import { Injectable } from '@nestjs/common';
import { User, UserDonationTransaction } from '@prisma/client';
import { has } from 'lodash';
import { registerDto } from 'src/authentication/dtos/requests/register.dto';
import { generateHash } from 'src/common/utils/authentication/bcrypt.utils';
import { UserDonationTransactionResponseDto } from 'src/donation/dto/donation-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OverviewCountResponseDto } from './dtos/responses/overview-count-response.dto';
import { AddWorkerDto } from './dtos/requests/add-worker.dto';
import { ChangeWorkerStatusDto } from './dtos/requests/change-worker-status-req.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly db: PrismaService) {}
  async getDonationOverYear(): Promise<Record<number, any[]>> {
    const currentYear = new Date();
    const startOfYear = new Date(currentYear.getFullYear(), 0, 1); // Jan 1
    const endOfYear = new Date(currentYear.getFullYear() + 1, 0, 1); // Jan 1 next year

    const donationThisYear = await this.db.userDonationTransaction.findMany({
      where: {
        createdAt: {
          gte: startOfYear,
          lt: endOfYear,
        },
      },
      include: {
        transaction: true,
        donor: true,
      },
    });

    const donationsByMonth = donationThisYear.reduce<
      Record<number, UserDonationTransaction[]>
    >((acc, donation) => {
      const month = new Date(donation.createdAt).getMonth(); // 0 = January, 11 = December

      if (!acc[month]) {
        acc[month] = [];
      }

      acc[month].push(donation);

      return acc;
    }, {});

    return donationsByMonth;
  }
  getCurrentWorkers(): Promise<User[]> {
    return this.db.user.findMany({
      where: {
        role: 'DBA7',
      },
    });
  }
  async addWorker(data: AddWorkerDto): Promise<User> {
    const hashedPassword = await generateHash(data.password);
    const { firstName, lastName, email, phoneNumber } = data;
    return this.db.user.create({
      data: {
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        email,
        role: 'DBA7',
      },
    });
  }
  deleteWorker(workerId: string): Promise<User> {
    return this.db.user.delete({
      where: {
        id: workerId,
      },
    });
  }
  changeWorkerStatus(changeWorkerStatusDto:ChangeWorkerStatusDto) {
    return this.db.user.update({
      where: {
        id:changeWorkerStatusDto.workerId,
      },
      data: {
        isActive: changeWorkerStatusDto.status,
      },
    });
  }
  async overViewCount(year?: number): Promise<OverviewCountResponseDto> {
    const selectedYear = year ?? new Date().getFullYear();
    const [donationsCount, sacrificesCount, workersCount] = await Promise.all([
      this.db.userDonationTransaction.count({
        where: {
          year: selectedYear,
        },
      }),
      this.db.sacrifice.count({
        where: {
          status: 'delivred',
          year: selectedYear,
        },
      }),
      this.db.user.count({
        where: {
          isActive: true,
          role: { in: ['ORGANIZER', 'DBA7'] },
        },
      }),
    ]);

    return {
      donationsCount,
      sacrificesCount,
      workersCount,
    };
  }
}
