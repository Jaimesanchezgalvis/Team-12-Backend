import { PaginationService } from '@app/common/services/pagination.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/Category.entity';
import { Repository } from 'typeorm';
import { IPagination } from '@app/common/interfaces/pagination.interface';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly paginationService: PaginationService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(page: IPagination) {
    return this.paginationService.paginate<Category>(
      this.categoryRepository,
      page,
      {
        select: ['id', 'name'],
      },
    );
  }
  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }
}
