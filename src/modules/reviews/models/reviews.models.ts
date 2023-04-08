import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

@Table
export class Reviews extends Model {
  @ForeignKey(() => User)
  user: User;

  @Column
  username: string;

  @Column
  review: string;
}
