import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reviews } from './models/reviews.models';

@Module({
  imports: [SequelizeModule.forFeature([Reviews])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
