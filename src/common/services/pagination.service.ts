import { Injectable } from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import {
  IPagination, IPaginationTypeOrm,
} from '../interfaces/pagination.interface';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

@Injectable()
export class PaginationService {
  /**
   * @description This method can be used when i need use the params directly to the orm
  */
  parse(pagination: IPagination): IPaginationTypeOrm {
    return {
      take: pagination.limit,
      skip: pagination.page - 1,
    };
  }
  async paginate<T>(repository: any, options: IPaginationOptions, params: FindOptionsWhere<T> | FindManyOptions<T>){
      return paginate<T>(repository, options, params);
    }
}
