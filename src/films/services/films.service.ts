import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFilmDto } from '../dto/create-film.dto';
import { UpdateFilmDto } from '../dto/update-film.dto';
import { PaginationService } from '@app/common/services/pagination.service';
import { IPagination } from '@app/common/interfaces/pagination.interface';
import { Film } from '../entities/Film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '@app/common/services/cloudinary.service';
import { GendersService } from './genders.service';
import { CategoriesService } from './categories.service';
import { UsersService } from '@app/auth/services/users.service';

@Injectable()
export class FilmsService {
  constructor(
    private readonly paginationService: PaginationService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly genderyService: GendersService,
    private readonly categoryService: CategoriesService,
    private readonly userService: UsersService,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  findAll(page: IPagination, where: object) {
    return this.paginationService.paginate<Film>(this.filmRepository, page, {
      relations: ['category', 'gender', 'user'],
      where,
    });
  }

  async findOne(id: number) {
    const item = await this.filmRepository.findOne({
      where: { id },
      relations: ['category', 'gender', 'user'],
    });
    if (!item) {
      throw new NotFoundException('film not found');
    }
    return item;
  }

  async create(userId: number, data: CreateFilmDto, image: Buffer) {
    const gender = await this.genderyService.findOne(data.genderId);
    if (!gender) {
      throw new BadRequestException('The gender not found');
    }
    const category = await this.categoryService.findOne(data.categoryId);
    if (!category) {
      throw new BadRequestException('The category not found');
    }
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException('The user not found');
    }
    const { title, sinopsis, director, language, release_date } = data;
    const posterUrl = await this.cloudinaryService.uploadImageAndGetUrl(image);
    const film = new Film();
    film.category = category;
    film.gender = gender;
    film.user = user;
    film.poster_url = posterUrl;
    const newFilm = this.filmRepository.create(
      Object.assign(film, {
        title,
        sinopsis,
        director,
        language,
        release_date,
      }),
    );
    return this.filmRepository.save(newFilm);
  }
  delete(id: number) {
    //TODO: look for the image ante delete at cloudinary
    return this.filmRepository.delete({ id });
  }
}
