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
import { injectable, inject } from 'inversify';
import { TodoRepository, TODO_REPOSITORY, Todo } from './todo.model';

export const TODO_SERVICE: symbol = Symbol.for('TodoService');

export interface TodoService {
  getTodos(): Promise<ReadonlyArray<Todo>>;
  getTodo(todoId: number): Promise<Todo | null>;
  createTodo(todoName: string): Promise<ReadonlyArray<Todo>>;
  deleteTodo(todoId: number): Promise<ReadonlyArray<Todo>>;
}

@injectable()
export class ApiTodoService implements TodoService {
  public constructor(@inject(TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {}

  public getTodos(): Promise<readonly Todo[]> {
    return Promise.resolve(this.todoRepository.findAll({ attributes: ['id', 'name'] }));
  }

  public getTodo(todoId: number): Promise<Todo | null> {
    return Promise.resolve(
      this.todoRepository.findOne({
        attributes: ['id', 'name'],
        where: {
          id: todoId,
        },
      }),
    );
  }

  public async createTodo(todoName: string): Promise<ReadonlyArray<Todo>> {
    await Promise.resolve(this.todoRepository.create({ name: todoName }));
    return this.getTodos();
  }

  public async deleteTodo(todoId: number): Promise<ReadonlyArray<Todo>> {
    await Promise.resolve(this.todoRepository.destroy({ where: { id: todoId } }));
    return this.getTodos();
  }
}
