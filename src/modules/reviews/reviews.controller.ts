import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CreateReviewResponse, GetReviewsResponse } from './response';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { Reviews } from './models/reviews.models';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiTags('API')
  @ApiOperation({ summary: 'Create Review' })
  @ApiResponse({ status: 201, type: CreateReviewResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createReview(
    @Body() dto: ReviewsDTO,
    @Req() request,
  ): Promise<CreateReviewResponse> {
    const user = request.user;
    return this.reviewsService.createReview(user, dto);
  }

  @ApiTags('API')
  @ApiOperation({ summary: 'Get Reviews' })
  @ApiResponse({ status: 200, type: GetReviewsResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('get')
  getReviews(): Promise<Reviews[]> {
    return this.reviewsService.getReviews();
  }
}
