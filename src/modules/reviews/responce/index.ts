import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewResponse {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  review: string;
}
