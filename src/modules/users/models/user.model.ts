import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Watchlist } from '../../watchlist/models/watchlist.model';
import { Reviews } from '../../reviews/models/reviews.models';
import { Message } from '../../messages/models/message.models';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchList: Watchlist[];

  @HasMany(() => Reviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  reviews: Reviews[];

  // @HasMany(() => Message, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // messages: Message[];
}
