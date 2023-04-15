import { Module } from '@nestjs/common';
import { FilmsService } from './services/films.service';
import { FilmsController } from './controllers/films.controller';
import { CategoriesController } from './controllers/categories.controller';
import { GendersController } from './controllers/genders.controller';
import { GendersService } from './services/genders.service';
import { CategoriesService } from './services/categories.service';
import { RatingsController } from './controllers/ratings.controller';
import { RatingsService } from './services/ratings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/Category.entity';
import { Film } from './entities/Film.entity';
import { Gender } from './entities/Gender.entity';
import { Rating } from './entities/Rating.entity';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Film, Gender, Rating]),
    CommonModule,
  ],
  controllers: [
    FilmsController,
    CategoriesController,
    GendersController,
    RatingsController,
  ],
  providers: [FilmsService, GendersService, CategoriesService, RatingsService],
})
export class FilmsModule {}
