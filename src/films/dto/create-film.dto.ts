import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateFilmDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  director: string;

  @ApiProperty()
  @IsString()
  sinopsis: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  language: string;

  @ApiProperty()
  @IsDateString()
  release_date: Date;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  genderId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  categoryId: number;
}
