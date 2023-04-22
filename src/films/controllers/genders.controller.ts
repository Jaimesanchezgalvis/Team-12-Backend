import { IPagination } from '@app/common/interfaces/pagination.interface';
import { PaginationPipe } from '@app/common/pipes/pagination.pipe';
import { Controller, Get, Query } from '@nestjs/common';
import { GendersService } from '../services/genders.service';
import { ApiTags } from '@nestjs/swagger';
import { SearchQueryPipe } from '@app/common/pipes/search-query.pipe';
import { Gender } from '../entities/Gender.entity';
import { PaginationQuery } from '@app/common/decorators/api-query.pagination';

@ApiTags('genders')
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}
  @Get()
  @PaginationQuery()
  findAll(
    @Query(PaginationPipe) pagination: IPagination,
    @Query('query', new SearchQueryPipe(Gender)) where: object[],
  ): any {
    return this.gendersService.findAll(pagination, where);
  }
}
