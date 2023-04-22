import { PaginationService } from '@app/common/services/pagination.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from '../entities/Gender.entity';
import { IPagination } from '@app/common/interfaces/pagination.interface';
import { Repository } from 'typeorm';

@Injectable()
export class GendersService {
  constructor(
    private readonly paginationService: PaginationService,
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  findAll(page: IPagination, where: object[]) {
    return this.paginationService.paginate<Gender>(
      this.genderRepository,
      page,
      {
        select: ['id', 'name'],
        where,
      },
    );
  }
  async findOne(id: number) {
    const gender = await this.genderRepository.findOne({ where: { id } });
    if (!gender) {
      throw new BadRequestException('The gender not found');
    }
    return gender;
  }
}
