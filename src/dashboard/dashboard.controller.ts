import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { OverviewCountResponseDto } from './dtos/responses/overview-count-response.dto';
import { WorkerDto } from './dtos/responses/worker.dto';
import { AddWorkerDto } from './dtos/requests/add-worker.dto';
import { ChangeWorkerStatusDto } from './dtos/requests/change-worker-status-req.dto';
import { AcessTokenGuard } from 'src/authentication/guards/access-token.guard';

@Controller('dashboard')
@ApiTags('Dashboard')
@UseGuards(AcessTokenGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview-count')
  @ApiOperation({
    summary: 'Get overview counts for donations, sacrifices, and workers',
  })
  @ApiQuery({
    name: 'year',
    required: false,
  })
  @ApiOkResponse({ type: OverviewCountResponseDto })
  overViewCount(@Query('year') year?: number) {
    return this.dashboardService.overViewCount(year);
  }

  @Get('donations-over-year')
  @ApiOperation({ summary: 'Get donation data over the year' })
  @ApiOkResponse({ type: Object })
  getDonationOverYear() {
    return this.dashboardService.getDonationOverYear();
  }

  @Get('current-workers')
  @ApiOperation({ summary: 'Get all current workers' })
  @ApiOkResponse({ type: [WorkerDto] })
  getCurrentWorkers() {
    return this.dashboardService.getCurrentWorkers();
  }

  @Post('add-worker')
  @ApiOperation({ summary: 'Add a new worker' })
  @ApiOkResponse({ type: WorkerDto })
  addWorker(@Body() addWorkerDto: AddWorkerDto) {
    return this.dashboardService.addWorker(addWorkerDto);
  }

  @Delete('delete-worker/:id')
  @ApiOperation({ summary: 'Delete a worker by ID' })
  @ApiOkResponse({ type: WorkerDto })
  deleteWorker(@Param('id') workerId: string) {
    return this.dashboardService.deleteWorker(workerId);
  }

  @Post('change-worker-status')
  @ApiOperation({ summary: "Change a worker's status" })
  @ApiOkResponse({ type: WorkerDto })
  changeWorkerStatus(@Body() changeWorkerStatusDto: ChangeWorkerStatusDto) {
    return this.dashboardService.changeWorkerStatus(changeWorkerStatusDto);
  }
}
