import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDto } from 'src/user/dto/user.dto';

export class WorkerDto extends PickType(UserDto, [
  'id',
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
  'role',
]) {}
