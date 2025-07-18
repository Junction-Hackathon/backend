import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadVideoDto {
  @ApiProperty({
    description: 'the id of the sacrifice record provided on download ',
  })
  @IsString()
  @IsNotEmpty()
  sacrificeId: string;
}
