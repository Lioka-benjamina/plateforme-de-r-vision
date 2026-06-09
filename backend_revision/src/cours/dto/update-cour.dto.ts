import { PartialType } from '@nestjs/mapped-types';
import { CreateCourDto } from './create-cour.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCourDto extends PartialType(CreateCourDto) {
  @IsOptional()
  @IsString()
  status?: string;
}
