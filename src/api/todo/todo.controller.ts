/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  interfaces,
  controller,
  httpGet,
  response,
  requestParam,
  httpPost,
  requestBody,
  httpDelete,
} from 'inversify-express-utils';
import { TODO_SERVICE, TodoService } from './todo.service';
import { inject } from 'inversify';
import httpStatusCode from 'http-status-codes';
import { Response } from 'express';

@controller('/api/todo')
export class TodoController implements interfaces.Controller {
  public constructor(@inject(TODO_SERVICE) private readonly todoService: TodoService) {}

  @httpGet('/')
  public async getTodos(@response() res: Response) {
    try {
      return await this.todoService.getTodos();
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
    }
  }

  @httpGet('/:id')
  public async getTodo(@requestParam('id') todoId: number, @response() res: Response) {
    try {
      return await this.todoService.getTodo(todoId);
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
    }
  }

  @httpPost('/')
  public async createTodo(@requestBody() todo: { name: string }, @response() res: Response) {
    try {
      return await this.todoService.createTodo(todo.name);
    } catch (error) {
      return res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Something went wrongm with creating todo' });
    }
  }

  @httpDelete('/:id')
  public async deleteTodo(@requestParam('id') todoId: number, @response() res: Response) {
    try {
      return await this.todoService.deleteTodo(todoId);
    } catch (error) {
      return res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Something went wrong with deleting todo' });
    }
  }
}
