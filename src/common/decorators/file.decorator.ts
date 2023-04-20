import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

export const FileUpload = () =>
  UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  );
