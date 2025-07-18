import { UserResponseDto } from 'src/user/dto/res/user-response.dto';

export class SendFileDto {
  fileBuffer: string;
  year: number;
  donor: UserResponseDto;
  slayer: UserResponseDto;
}

