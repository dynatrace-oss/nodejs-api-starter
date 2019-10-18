import { Column, DataType, Model, Table } from 'sequelize-typescript';

export const TODO_REPOSITORY: symbol = Symbol.for('TodoRepository');

@Table
export class Todo extends Model<Todo> {
  @Column({
    type: DataType.TEXT,
    comment: 'The name of the todo',
  })
  public name!: string;
}

export type TodoRepository = typeof Todo;
