import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { WatchlistModel } from 'src/modules/watchlist/models/watchlist.model';

@Table
export class UserModel extends Model {
    @Column
    firstName: string

    @Column
    userName: string

    @Column
    email: string

    @Column
    password: string

    @HasMany(() => WatchlistModel, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    watchlist: WatchlistModel[]
}