import { Controller, Get, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetNewsResponse } from './response';
import { News } from './models/news.models';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiTags('API')
  @ApiOperation({ summary: 'Get News' })
  @ApiResponse({ status: 200, type: GetNewsResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('get')
  getReviews(): Promise<News[]> {
    return this.newsService.getNews();
  }
}
