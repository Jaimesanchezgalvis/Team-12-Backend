import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Max } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsNumber()
  @Max(10)
  rating: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsInt()
  filmId: number;
}
