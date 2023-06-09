import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewResponse {
  @ApiProperty()
  @IsNumber()
  user: number;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  review: string;
}

export class GetReviewsResponse {
  @ApiProperty()
  @IsNumber()
  user: number;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  review: string;

  @ApiProperty()
  @IsString()
  createdAt: string;

  @ApiProperty()
  @IsString()
  updatedAt: string;
}
