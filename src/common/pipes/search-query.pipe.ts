import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { IModel } from '../interfaces/mode.interface';
import { isString } from 'class-validator';
import { ILike } from 'typeorm';

@Injectable()
export class SearchQueryPipe implements PipeTransform {
  constructor(readonly typeModel: IModel) {}
  transform(value: string, metadata: ArgumentMetadata) {
    let where = [];
    if (isString(value) && !!value) {
      where = this.typeModel.fieldsForQuery.map((key) => {
        if (key.includes('.')) {
          const [table, field] = key.split('.');
          return {
            [table]: { [field]: ILike(`%${value}%`) },
          };
        }
        return { [key]: ILike(`%${value}%`) };
      });
    }
    console.log({ where: JSON.stringify(where) });
    return where;
  }
}
