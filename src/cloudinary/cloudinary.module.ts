import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { CloudinaryWrapperService } from './cloudinary.service';

@Module({
  imports: [
    ConfigModule,
    CloudinaryModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        api_key: configService.get('cloudinary.apiKey'),
        cloud_name: 'dtgfobbl5',
        api_secret: configService.get('cloudinary.apiSecret'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CloudinaryWrapperService],
  exports: [CloudinaryWrapperService],
})
export class CloudinaryModuleWrapper {}
