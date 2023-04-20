import { registerAs, ConfigService } from '@nestjs/config';
import { APP_CONFIG, CLOUDINARY_CONFIG, JWT_CONFIG } from './constants.config';

interface IEnvAppConfig {
  HTTP_PORT: number;
}

export interface IJwtConfig {
  secretKey: string;
  secretKeyRefresh: string;
  expirationTime: string;
  expirationTimeRefresh: string;
}
export interface ICloudinaryConfig {
  secretKey: string;
  name: string;
  apiKey: string;
}
export type IAppConfig = IEnvAppConfig & ConfigService;

export default registerAs(APP_CONFIG, () => ({
  httpPort: process.env.HTTP_PORT || 3000,
}));

export const defaultPagination = {
  limit: 100,
  page: 1,
};

export const jwtConfig = registerAs(
  JWT_CONFIG,
  (): IJwtConfig => ({
    secretKey: process.env.JWT_SECRET_KEY || 'secretKey1',
    secretKeyRefresh: process.env.JWT_SECRET_KEY_REFRESH || 'secretKeyRefresh',
    expirationTime: process.env.JWT_EXPIRATION_TIME || 'exp1',
    expirationTimeRefresh: process.env.JWT_EXPIRATION_TIME_REFRESH || 'exp2',
  }),
);

export const cloudinaryConfig = registerAs(
  CLOUDINARY_CONFIG,
  (): ICloudinaryConfig => ({
    secretKey: process.env.CLOUDINARY_API_SECRET,
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  }),
);
