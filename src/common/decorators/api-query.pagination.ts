import { ApiQuery } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const PaginationQuery = () => {
  return applyDecorators(
    ApiQuery({
      required: false,
      name: 'offset',
    }),
    ApiQuery({
      required: false,
      name: 'limit',
    }),
    ApiQuery({
      type: 'string',
      required: false,
      name: 'query',
    }),
  );
};
