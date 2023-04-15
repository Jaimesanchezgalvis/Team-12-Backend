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

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(@Query(PaginationPipe) pagination: IPagination): any {
    return this.filmsService.findAll(pagination);
  }
  @Get('/:film_id')
  findOne(@Param('film_id', ParseIntPipe) rideId: number) {
    return this.filmsService.findOne(rideId);
  }
}
