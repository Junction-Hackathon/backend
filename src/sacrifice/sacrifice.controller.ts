import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseDatePipe,
  UseGuards,
} from '@nestjs/common';
import { SacrificeService } from './sacrifice.service';
import { CreateSacrificeDto } from './dtos/create-sacrifice.dto';
import { UpdateSacrificeDto } from './dtos/update-sacrifice.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/authentication/decorators/role.decorator';
import { UserRoleGuard } from 'src/authentication/guards/userRole.Guard';
import { USER } from 'src/authentication/decorators/user.decorartor';
import { AcessTokenGuard } from 'src/authentication/guards/access-token.guard';
import { SacrificeResponseDto } from './dtos/res/sacrifice-res.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('sacrifice')
@Controller('sacrifice')
@UseGuards(AcessTokenGuard)
export class SacrificeController {
  constructor(private readonly sacrificeService: SacrificeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sacrifice' })
  @ApiResponse({
    status: 201,
    description: 'The sacrifice has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createSacrificeDto: CreateSacrificeDto) {
    return this.sacrificeService.create(createSacrificeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sacrifices' })
  @ApiResponse({ status: 200, description: 'Return all sacrifices.' })
  findAll(@Query() query: any) {
    return this.sacrificeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sacrifice by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the sacrifice.',
    type: () => SacrificeResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.sacrificeService.findOne(id);
  }
  @Roles('DBA7')
  @Get('donators')
  @ApiOperation({
    summary: 'Get dba7 list',
    description: 'Get a list of donators that dba7 need to slay for ',
  })
  @ApiResponse({
    status: 200,
    type:  [SacrificeResponseDto],

  })
  findDonators(@USER('id') userId: string) {
    return this.sacrificeService.getCurrentExcutorDonators(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sacrifice' })
  @ApiResponse({
    status: 200,
    description: 'The sacrifice has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateSacrificeDto: UpdateSacrificeDto,
  ) {
    return this.sacrificeService.update(id, updateSacrificeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sacrifice' })
  @ApiResponse({
    status: 200,
    description: 'The sacrifice has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.sacrificeService.remove(id);
  }

  @Roles('ORGANIZER')
  @Patch(':id/assign/:sacrificerId')
  @ApiOperation({ summary: 'Assign a sacrificer to a sacrifice' })
  @ApiResponse({
    status: 200,
    description: 'The sacrificer has been successfully assigned.',
  })
  assignSacrificer(
    @Param('id') id: string,
    @Param('sacrificerId') sacrificerId: string,
    @Query('slayedAt') slayedAt: Date,
  ) {
    return this.sacrificeService.sacrifice(id, sacrificerId, slayedAt);
  }
}
