import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserModel } from '../../../modules/users/models/user.model';

@Table
export class WatchlistModel extends Model {
    @ForeignKey(() => UserModel)
    userId: UserModel

    @Column
    name: string

    @Column
    assetId: string
}