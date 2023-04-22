import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRatingDto } from '../dto/create-rating.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '../entities/Rating.entity';
import { UsersService } from '@app/auth/services/users.service';
import { FilmsService } from './films.service';
import { IPagination } from '@app/common/interfaces/pagination.interface';
import { PaginationService } from '@app/common/services/pagination.service';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    private readonly userService: UsersService,
    private readonly paginationService: PaginationService,
    private readonly filmService: FilmsService,
  ) {}

  findAll(page: IPagination, filmId: number, where: object[]) {
    return this.paginationService.paginate<Rating>(
      this.ratingRepository,
      page,
      { where: where.map((x) => ({ ...x, film: { id: filmId } })) },
    );
  }
  async findOne(id: number) {
    const rating = await this.ratingRepository.findOne({ where: { id } });
    if (!rating) {
      throw new BadRequestException('The rating not found');
    }
    return rating;
  }
  async create(userId: number, data: CreateRatingDto) {
    const user = await this.userService.findOne(userId);
    const film = await this.filmService.findOne(data.filmId);
    const newRating = this.ratingRepository.create({
      user,
      film,
      comment: data.comment,
      rating: data.rating,
    });
    const { id, rating, comment } = await this.ratingRepository.save(newRating);
    return { id, rating, comment };
  }

  delete(id: number) {
    return this.ratingRepository.delete({ id });
  }
}
