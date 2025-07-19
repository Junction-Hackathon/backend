import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class videoDoneProcessingDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;
  @IsOptional()
  @IsUrl()
  blurUrl: string;
  @IsUrl()
  enhancedUrl: string;
}
