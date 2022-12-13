import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WatchlistModel } from './models/watchlist.model';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';

@Module({
    imports: [
        SequelizeModule.forFeature([WatchlistModel])
    ],
    controllers: [WatchlistController],
    providers: [WatchlistService],
})
export class WatchlistModule {}
