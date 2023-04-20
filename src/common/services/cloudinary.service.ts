import { ICloudinaryConfig } from '@app/config/app.config';
import { CLOUDINARY_CONFIG } from '@app/config/constants.config';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cloudinary = require('cloudinary');
import stream = require('stream');

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.v2.config({
      cloud_name: configService.get<ICloudinaryConfig>(CLOUDINARY_CONFIG).name,
      api_key: configService.get<ICloudinaryConfig>(CLOUDINARY_CONFIG).apiKey,
      api_secret:
        configService.get<ICloudinaryConfig>(CLOUDINARY_CONFIG).secretKey,
    });
  }
  async uploadImageAndGetUrl(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        (error, result) => {
          if (error) {
            Logger.error(error);
            reject(
              new InternalServerErrorException(
                'Cloudinary integration had an error',
              ),
            );
          } else {
            resolve(result.secure_url);
          }
        },
      );
      const readStream = stream.Readable.from(buffer);
      readStream.pipe(uploadStream);
    });
  }
}
