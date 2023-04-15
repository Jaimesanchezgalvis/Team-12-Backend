import { IPagination } from '@app/common/interfaces/pagination.interface';
import { PaginationPipe } from '@app/common/pipes/pagination.pipe';
import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  findAll(@Query(PaginationPipe) pagination: IPagination): any {
    return this.categoriesService.findAll(pagination);
  }
}
