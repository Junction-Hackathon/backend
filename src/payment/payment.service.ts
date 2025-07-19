import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}
  checkout(quantity: number) {
    const totalPrice = quantity * 2500;
    return this.prismaService.transaction.create({
      data: {
        amount: totalPrice,
        status: 'succeeded',
        gateway: 'CIB',
        paymentMethod: 'Dahabia',
        currency: 'dzd',
      },
    });
  }
}
