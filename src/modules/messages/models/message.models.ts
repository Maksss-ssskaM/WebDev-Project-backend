import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table
export class Message extends Model {
  @Column
  username: string;

  @Column
  message: string;
}
