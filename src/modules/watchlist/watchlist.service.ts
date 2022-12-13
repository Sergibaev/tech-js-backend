import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWatchlistDTO } from './dto/create-watchlist.dto';
import { WatchlistModel } from './models/watchlist.model';
import { CreateAssetResponse } from './response/create-asset.response';

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(WatchlistModel) private readonly watchlistRepository: typeof WatchlistModel) { }
    
    async createAsset(user, dto: CreateWatchlistDTO): Promise<CreateAssetResponse> {
        const watchlist = {
            userId: user.id,
            name: dto.name,
            assetId: dto.assetId
        }
        await this.watchlistRepository.create(watchlist)
        return watchlist
    }

    async deleteAsset(userId: number, assetId: string): Promise<true> {
        await this.watchlistRepository.destroy({where: {id: assetId, userId}})
        return true
    }
}
