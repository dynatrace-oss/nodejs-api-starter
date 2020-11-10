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
      bind<TodoService>(TODO_SERVICE).to(ApiTodoService).inSingletonScope();
    },
  );
};
