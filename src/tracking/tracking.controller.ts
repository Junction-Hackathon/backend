import { Controller, Post, Get, Delete, Param, Body, Query } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { SacrificeStatus } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tracking')
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start delivery for a sacrifice' })
  @ApiBody({ schema: { properties: { sacrificeId: { type: 'string' } } } })
  @ApiResponse({ status: 201, description: 'Delivery started successfully.' })
  async startDelivery(@Body('sacrificeId') sacrificeId: string) {
    return this.trackingService.startDelivery(sacrificeId);
  }

  @Get(':sacrificeId/status')
  @ApiOperation({ summary: 'Get status of a sacrifice' })
  @ApiParam({ name: 'sacrificeId', type: 'string', description: 'ID of the sacrifice' })
  @ApiResponse({ status: 200, description: 'Current status of the sacrifice.' })
  async getStatus(@Param('sacrificeId') sacrificeId: string) {
    return this.trackingService.getStatus(sacrificeId);
  }

  @Delete(':sacrificeId')
  @ApiOperation({ summary: 'Cancel delivery of a sacrifice' })
  @ApiParam({ name: 'sacrificeId', type: 'string', description: 'ID of the sacrifice' })
  @ApiResponse({ status: 200, description: 'Delivery cancelled successfully.' })
  async cancelDelivery(@Param('sacrificeId') sacrificeId: string) {
    return this.trackingService.cancelDelivery(sacrificeId);
  }

  @Get(':sacrificeId/trackings/:status')
  @ApiOperation({ summary: 'Get trackings by status for a sacrifice' })
  @ApiParam({ name: 'sacrificeId', type: 'string', description: 'ID of the sacrifice' })
  @ApiParam({ name: 'status', enum: SacrificeStatus, description: 'Status of the sacrifice' })
  @ApiQuery({ name: 'page', required: false, type: 'string', description: 'Page number', example: '1' })
  @ApiQuery({ name: 'limit', required: false, type: 'string', description: 'Items per page', example: '10' })
  @ApiResponse({ status: 200, description: 'List of trackings by status.' })
  async getTrackingsByStatus(
    @Param('sacrificeId') sacrificeId: string,
    @Param('status') status: SacrificeStatus,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.trackingService.getTrackingsByStatus(
      sacrificeId,
      status,
      Number(page),
      Number(limit),
    );
  }
}
