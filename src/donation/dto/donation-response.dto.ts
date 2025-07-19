import { ApiProperty } from '@nestjs/swagger';
import { TransactionResponseDto } from 'src/payment/dto/res/transaction.dto';
import { UserResponseDto } from 'src/user/dto/res/user-response.dto';

export class UserDonationTransactionResponseDto {
  @ApiProperty({
    example: 'udt_abc123',
    description: 'Unique ID of the user donation transaction',
  })
  id: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity of sacrifices or donations made',
  })
  qty: number;

  @ApiProperty({ example: 2025, description: 'Year of the donation' })
  year: number;

  @ApiProperty({ description: 'Donor user associated with this transaction' })
  donor: UserResponseDto;

  @ApiProperty({ description: 'Payment transaction information' })
  transaction: TransactionResponseDto;

  @ApiProperty({
    example: '2025-07-18T10:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-07-18T11:00:00.000Z',
    description: 'Last updated timestamp',
  })
  updatedAt: Date;
}
