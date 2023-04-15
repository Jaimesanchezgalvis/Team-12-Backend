import { IPagination } from '@app/common/interfaces/pagination.interface';
import { PaginationPipe } from '@app/common/pipes/pagination.pipe';
import { Controller, Get, Query } from '@nestjs/common';
import { GendersService } from '../services/genders.service';

@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}
  @Get()
  findAll(@Query(PaginationPipe) pagination: IPagination): any {
    return this.gendersService.findAll(pagination);
  }
}
