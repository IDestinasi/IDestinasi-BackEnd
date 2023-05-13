/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';

export class FilterDestinationType {
  @IsOptional()
  name: string;

  @IsOptional()
  category: string;

  @IsOptional()
  cratedAt: Date;
}

