import { ApiProperty } from '@nestjs/swagger';

export class TransactionResponseDto {
  @ApiProperty({
    example: 'txn_abc123',
    description: 'Unique identifier for the transaction',
  })
  id: string;

  @ApiProperty({
    example: 'card',
    description: 'Payment method used for the transaction',
  })
  paymentMethod: string;

  @ApiProperty({
    example: 2500.0,
    description: 'Amount paid in the transaction',
  })
  amount: number;

  @ApiProperty({
    example: 'DZD',
    description: 'Currency code (ISO 4217 format)',
  })
  currency: string;

  @ApiProperty({
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    description: 'Status of the transaction',
  })
  status: string;

  @ApiProperty({
    enum: ['STRIPE', 'PAYPAL', 'BARIDI_MOB', 'CIB'],
    description: 'Payment gateway used for the transaction',
  })
  gateway: string;

  @ApiProperty({
    example: '2025-07-18T12:30:00.000Z',
    description: 'Timestamp when the transaction was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-07-18T12:45:00.000Z',
    description: 'Timestamp when the transaction was last updated',
  })
  updatedAt: Date;
}
