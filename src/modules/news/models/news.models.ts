import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class News extends Model {
  @Column
  name: string;

  @Column
  imageurl: string;

  @Column
  body: string;
}
