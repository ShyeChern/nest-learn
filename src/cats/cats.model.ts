import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Comment,
  Table,
  AllowNull,
  Index,
} from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'cats' })
export class Cat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Comment('id of cat')
  @Column
  id: number;

  @Index
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  age: number;

  @AllowNull(false)
  @Column
  breed: number;
}
