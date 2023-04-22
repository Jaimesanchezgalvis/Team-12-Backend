import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  ParseIntPipe,
  Get,
  Query,
} from '@nestjs/common';
import { RatingsService } from '../services/ratings.service';
import { CreateRatingDto } from '../dto/create-rating.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingService: RatingsService) {}

  @Post()
  async create(@Body() data: CreateRatingDto) {
    const TMP_USER_ID = 1; //TODO: ACTIVE THE AUTHENTICATION
    return this.ratingService.create(TMP_USER_ID, data);
  }

  @Delete(':rating_id')
  @HttpCode(204)
  async delete(@Param('rating_id', ParseIntPipe) id: number) {
    await this.ratingService.delete(id);
  }
}
