import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  Query,
} from '@nestjs/common';
import { FilmsService } from '../services/films.service';
import { PaginationPipe } from '@app/common/pipes/pagination.pipe';
import { IPagination } from '@app/common/interfaces/pagination.interface';
import { SearchQueryPipe } from '@app/common/pipes/search-query.pipe';
import { Film } from '../entities/Film.entity';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(
    @Query(PaginationPipe) pagination: IPagination,
    @Query('query',new SearchQueryPipe(Film)) where: object,
  ): any {
    return this.filmsService.findAll(pagination, where);
  }
  @Get('/:film_id')
  findOne(@Param('film_id', ParseIntPipe) rideId: number) {
    return this.filmsService.findOne(rideId);
  }
}
