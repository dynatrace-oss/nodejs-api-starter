/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContainerModule, interfaces } from 'inversify';
import { TODO_REPOSITORY, TodoRepository, Todo } from './todo.model';
import { TodoService, TODO_SERVICE, ApiTodoService } from './todo.service';

export const todoModule = (): ContainerModule => {
  return new ContainerModule(
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
      bind<TodoRepository>(TODO_REPOSITORY).toConstantValue(Todo);
      /* Services */
      bind<TodoService>(TODO_SERVICE)
        .to(ApiTodoService)
        .inSingletonScope();
    },
  );
};
