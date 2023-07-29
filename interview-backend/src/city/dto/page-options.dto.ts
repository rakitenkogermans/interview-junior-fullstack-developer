import { IsNumber, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class PageOptionsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit = 10;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  order = 'asc';

  @IsOptional()
  filter: string;
}
