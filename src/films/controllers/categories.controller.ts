import { IPagination } from '@app/common/interfaces/pagination.interface';
import { PaginationPipe } from '@app/common/pipes/pagination.pipe';
import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { ApiTags } from '@nestjs/swagger';
import { SearchQueryPipe } from '@app/common/pipes/search-query.pipe';
import { Category } from '../entities/Category.entity';
import { PaginationQuery } from '@app/common/decorators/api-query.pagination';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  @PaginationQuery()
  findAll(
    @Query(PaginationPipe) pagination: IPagination,
    @Query('query', new SearchQueryPipe(Category)) where: object[],
  ): any {
    return this.categoriesService.findAll(pagination, where);
  }
}
