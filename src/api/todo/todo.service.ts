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
