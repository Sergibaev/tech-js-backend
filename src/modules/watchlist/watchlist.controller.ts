import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CreateWatchlistDTO } from './dto/create-watchlist.dto';
import { CreateAssetResponse } from './response/create-asset.response';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) { }
    
    @ApiTags('Watchlist')
    @ApiResponse({status: 201, type: CreateAssetResponse})
    @UseGuards(JwtAuthGuard)
    @Post()
    createAsset(@Body() assetDto: CreateWatchlistDTO, @Req() request): Promise<CreateAssetResponse> {
        const user = request.user
        return this.watchlistService.createAsset(user, assetDto)
    }

    @ApiTags('Watchlist')
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteAsset(@Param('id') assetId: string, @Req() request): Promise<boolean> {
        const {id} = request.user
        return this.watchlistService.deleteAsset(id, assetId)
    }
}
