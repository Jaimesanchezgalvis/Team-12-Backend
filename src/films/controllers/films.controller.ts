import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UploadedFile,
  HttpCode,
} from '@nestjs/common';
import { FilmsService } from '../services/films.service';
import { PaginationPipe } from '@app/common/pipes/pagination.pipe';
import { IPagination } from '@app/common/interfaces/pagination.interface';
import { SearchQueryPipe } from '@app/common/pipes/search-query.pipe';
import { Film } from '../entities/Film.entity';
import { CreateFilmDto } from '../dto/create-film.dto';
import { FileUpload } from '@app/common/decorators/file.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RatingsService } from '../services/ratings.service';
import { Rating } from '../entities/Rating.entity';
import { PaginationQuery } from '@app/common/decorators/api-query.pagination';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(
    private readonly filmsService: FilmsService,
    private readonly ratingsService: RatingsService,
  ) {}

  @Get()
  @PaginationQuery()
  findAll(
    @Query(PaginationPipe) pagination: IPagination,
    @Query('query', new SearchQueryPipe(Film)) where: object,
  ) {
    return this.filmsService.findAll(pagination, where);
  }
  @Get('/:film_id')
  findOne(@Param('film_id', ParseIntPipe) rideId: number) {
    return this.filmsService.findOne(rideId);
  }

  @Post()
  @FileUpload()
  create(
    @Body() data: CreateFilmDto,
    @UploadedFile() file: { buffer: Buffer },
  ) {
    const TMP_USER_ID = 1; //TODO: ACTIVE THE AUTHENTICATION
    return this.filmsService.create(TMP_USER_ID, data, file.buffer);
  }

  @Delete('/:film_id')
  @HttpCode(204)
  async delete(@Param('film_id', ParseIntPipe) id: number) {
    await this.filmsService.delete(id);
  }

  @Get('/:film_id/ratings')
  @PaginationQuery()
  async findAllRates(
    @Query(PaginationPipe) pagination: IPagination,
    @Query('query', new SearchQueryPipe(Rating)) where: object[],
    @Param('film_id', ParseIntPipe) filmId: number,
  ) {
    return await this.ratingsService.findAll(pagination, filmId, where);
  }
}
