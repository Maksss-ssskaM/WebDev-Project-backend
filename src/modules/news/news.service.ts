import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './models/news.models';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News)
    private readonly newsService: typeof News,
  ) {}

  async getNews(): Promise<News[]> {
    return await this.newsService.findAll();
  }
}
