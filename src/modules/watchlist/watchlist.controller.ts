import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateAssetResponse, GetUserAssetsResponse } from './response';
import { Watchlist } from './models/watchlist.model';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @ApiOperation({ summary: 'Create Watchlist Asset' })
  @ApiResponse({ status: 201, type: CreateAssetResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(
    @Body() assetDto: WatchListDTO,
    @Req() request,
  ): Promise<CreateAssetResponse> {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  @ApiTags('API')
  @ApiOperation({ summary: 'Get Watchlist Asset' })
  @ApiResponse({ status: 200, type: GetUserAssetsResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('get-elements')
  getUserAssets(@Req() request): Promise<Watchlist[]> {
    const user = request.user;
    return this.watchlistService.getUserAssets(user.id);
  }

  @ApiTags('API')
  @ApiOperation({ summary: 'Delete Watchlist Asset' })
  @ApiResponse({
    status: 200,
    description: 'Favorites list has been successfully deleted',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
