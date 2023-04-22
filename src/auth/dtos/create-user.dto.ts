import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { IsPassword } from '../../common/decorators/is-password.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  completeName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPassword()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
