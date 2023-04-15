import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from '../dto/create-film.dto';
import { UpdateFilmDto } from '../dto/update-film.dto';
import { PaginationService } from '@app/common/services/pagination.service';
import { IPagination } from '@app/common/interfaces/pagination.interface';
import { Film } from '../entities/Film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    private readonly paginationService: PaginationService,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  findAll(page: IPagination) {
    return this.paginationService.paginate<Film>(this.filmRepository, page, {
      relations: ['category', 'gender', 'user'],
    });
  }

  findOne(id: number) {
    return this.filmRepository.findOneOrFail({
      where: { id },
      relations: ['category', 'gender', 'user'],
    });
  }

}
