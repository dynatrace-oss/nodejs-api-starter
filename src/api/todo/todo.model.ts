/**
  Copyright 2019 Dynatrace LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
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
