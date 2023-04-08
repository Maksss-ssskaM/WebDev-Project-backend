import { Injectable } from '@nestjs/common';
import { AppService } from '../app/app.service';
import { InjectModel } from '@nestjs/sequelize';
import { Reviews } from './models/reviews.models';
import { ReviewsDTO } from './dto';
import { CreateReviewResponse } from './response';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews)
    private readonly reviewsService: typeof Reviews,
  ) {}

  async getReviews() {
    return await this.reviewsService.findAll();
  }

  async createReview(user, dto: ReviewsDTO): Promise<CreateReviewResponse> {
    const review = {
      user: user.id,
      username: user.username,
      review: dto.review,
    };
    await this.reviewsService.create(review);
    console.log(review);
    return review;
  }
}
