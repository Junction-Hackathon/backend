import { ApiProperty } from '@nestjs/swagger';
import { SacrificeStatus, VideoStatus } from '@prisma/client';
import { UserResponseDto } from 'src/user/dto/res/user-response.dto';
export class SacrificeVideoResponseDto {
  @ApiProperty({
    example: 'vid_123abc',
    description: 'Unique identifier for the video',
  })
  id: string;

  @ApiProperty({
    example: 'https://cdn.example.com/videos/abc123.mp4',
    description: 'URL to the final processed video',
  })
  url: string;

  @ApiProperty({
    example: 'https://cdn.example.com/videos/blur/abc123.jpg',
    description: 'URL to the blurred video thumbnail',
  })
  blurUrl: string;

  @ApiProperty({
    example: 'job_789xyz',
    description: 'The background job ID used to process the video',
  })
  jobId: string;

  @ApiProperty({
    enum: VideoStatus,
    description: 'Current status of the video processing job',
  })
  status: VideoStatus;
}
export class LocationResponseDto {
  @ApiProperty({
    example: 'loc_abc123',
    description: 'Unique identifier for the location',
  })
  id: string;

  @ApiProperty({
    example: 3.0588,
    description: 'Longitude coordinate of the location',
  })
  long: number;

  @ApiProperty({
    example: 36.7538,
    description: 'Latitude coordinate of the location',
  })
  lat: number;

  @ApiProperty({
    example: '2025-07-19T12:00:00.000Z',
    description: 'Time the location was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-07-19T13:00:00.000Z',
    description: 'Time the location was last updated',
  })
  updatedAt: Date;
}
export class SacrificeResponseDto {
  @ApiProperty({
    example: 'sac_123abc',
    description: 'Unique identifier for the sacrifice',
  })
  id: string;

  @ApiProperty({
    example: 2025,
    description: 'The year the sacrifice took place',
  })
  year: number;

  @ApiProperty({
    enum: SacrificeStatus,
    description: 'Current status of the sacrifice',
  })
  status: SacrificeStatus;

  @ApiProperty({
    example: '2025-06-17T14:30:00.000Z',
    required: false,
    description: 'Timestamp when the animal was slayed',
  })
  slayedAt?: Date;

  @ApiProperty({
    description: 'User who donated this sacrifice',
    type: UserResponseDto,
  })
  donor: UserResponseDto;

  @ApiProperty({
    required: false,
    description: 'User who performed the sacrifice (sacrificer)',
  })
  sacrificer?: UserResponseDto;

  @ApiProperty({
    required: false,
    description: 'Current location of the sacrifice, if applicable',
    type: () => LocationResponseDto,
  })
  currentLocation?: LocationResponseDto;

  @ApiProperty({ description: 'Sacrifice video and related metadata' })
  sacrificeVideo: SacrificeVideoResponseDto;

  @ApiProperty({
    example: '2025-06-16T10:00:00.000Z',
    description: 'When this record was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-06-17T08:15:00.000Z',
    description: 'Last time this record was updated',
  })
  updatedAt: Date;
}
