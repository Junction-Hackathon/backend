import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class DonationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paymentService: PaymentService,
  ) {}
  create(createDonationDto: CreateDonationDto, userId: string) {
    return this.prismaService.$transaction(async (tx) => {
      const transaction = await this.paymentService.checkout(
        createDonationDto.quanitity,
      );

      return await tx.userDonationTransaction.create({
        data: {
          donorId: userId,
          qty: createDonationDto.quanitity,
          year: createDonationDto.year.getFullYear(),
          transactionId: transaction.id,
        },
      });
    });
  }

  findAll(year?: number) {
    return this.prismaService.userDonationTransaction.findMany({
      where: {
        year: !year ? undefined : { equals: year },
      },
      include: {
        donor: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.userDonationTransaction.findUnique({
      where: { id },
      include: {
        transaction: true,
        donor: true,
      },
    });
  }

  findUserDonation() {}
}
