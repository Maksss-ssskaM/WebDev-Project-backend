import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CreateReviewResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateReviewResponse })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createReviews(
    @Body() dto: ReviewsDTO,
    @Req() request,
  ): Promise<CreateReviewResponse> {
    const user = request.user;
    return this.reviewsService.createReview(user, dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get('get')
  getReviews() {
    return this.reviewsService.getReviews();
  }
}
