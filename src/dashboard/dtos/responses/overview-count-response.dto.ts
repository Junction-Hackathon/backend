import { ApiProperty } from '@nestjs/swagger';

export class OverviewCountResponseDto {
  @ApiProperty({ description: 'Total number of donations' })
  donationsCount: number;

  @ApiProperty({ description: 'Total number of sacrifices' })
  sacrificesCount: number;

  @ApiProperty({ description: 'Total number of workers' })
  workersCount: number;
}
