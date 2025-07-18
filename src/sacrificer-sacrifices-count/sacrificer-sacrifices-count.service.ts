import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSacrificerSacrificesCountDto } from './dtos/create-sacrificer-sacrifices-count.dto';
import { UpdateSacrificerSacrificesCountDto } from './dtos/update-sacrificer-sacrifices-count.dto';

@Injectable()
export class SacrificerSacrificesCountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createSacrificerSacrificesCountDto: CreateSacrificerSacrificesCountDto,
  ) {
    return this.prisma.$transaction(async (tx) => {
     const sacrificesToUpdate = await tx.sacrifice.findMany({
    where: { sacrificedById: null },
    orderBy: { createdAt: 'asc' }, // Or any relevant field
    take: createSacrificerSacrificesCountDto.count, // x
    select: { id: true },
  });

  // 2. Update them individually (or with Promise.all if you prefer)
  for (const sacrifice of sacrificesToUpdate) {
    await tx.sacrifice.update({
      where: { id: sacrifice.id },
      data: {
        sacrificedById: createSacrificerSacrificesCountDto.sacrificerId,
      },
    });
  }      return tx.sacrificerSacrificesCount.create({
        data: createSacrificerSacrificesCountDto,
      });
    });
  }

  async findAll() {
    return this.prisma.sacrificerSacrificesCount.findMany();
  }

  async findOne(id: string) {
    return this.prisma.sacrificerSacrificesCount.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateSacrificerSacrificesCountDto: UpdateSacrificerSacrificesCountDto,
  ) {
    return this.prisma.sacrificerSacrificesCount.update({
      where: { id },
      data: updateSacrificerSacrificesCountDto,
    });
  }

  async remove(id: string) {
    return this.prisma.sacrificerSacrificesCount.delete({ where: { id } });
  }
}
