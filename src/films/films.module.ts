import { Module } from '@nestjs/common';
import { FilmsService } from './services/films.service';
import { FilmsController } from './controllers/films.controller';
import { CategoriesController } from './controllers/categories.controller';
import { GendersController } from './controllers/genders.controller';
import { GendersService } from './services/genders.service';
import { CategoriesService } from './services/categories.service';

@Module({
  controllers: [FilmsController, CategoriesController, GendersController],
  providers: [FilmsService, GendersService, CategoriesService],
})
export class FilmsModule {}
