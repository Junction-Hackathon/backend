
import { PickType } from '@nestjs/swagger';
import { registerDto } from 'src/authentication/dtos/requests/register.dto';

export class AddWorkerDto extends PickType(registerDto, [
  'email',
  'password',
  'phoneNumber',
  'firstName',
  'lastName',
]) {}
