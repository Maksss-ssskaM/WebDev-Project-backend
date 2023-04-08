import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewsDTO {
  @ApiProperty()
  @IsString()
  review: string;
}
