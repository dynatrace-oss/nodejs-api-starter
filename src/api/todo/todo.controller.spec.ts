import 'reflect-metadata';

import { Response as MockResponse } from 'jest-express/lib/response';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Response } from 'express';
import httpStatusCode from 'http-status-codes';

describe('TodoController', () => {
  let todoController: TodoController;
  let mockResponse: MockResponse;

  describe('Success Response', () => {
    const mockTodoService = jest.fn<TodoService, []>(() => ({
      getTodos: jest.fn().mockResolvedValue([{ id: 1, name: 'Task 1' }]),
      getTodo: jest.fn().mockResolvedValue([{ id: 1, name: 'Task 2' }]),
      createTodo: jest.fn().mockResolvedValue([{ id: 1, name: 'Task 3' }]),
      deleteTodo: jest.fn().mockResolvedValue([{ id: 1, name: 'Task 4' }]),
    }));

    beforeEach(() => {
      mockResponse = new MockResponse();
      todoController = new TodoController(mockTodoService());
    });

    describe('getTodos', () => {
      it('should return instanceof Array', async () => {
        const result = await todoController.getTodos((mockResponse as unknown) as Response);
        expect(result).toBeInstanceOf(Array);
      });
    });

    describe('getTodo', () => {
      it('should return instanceof Array', async () => {
        const result = await todoController.getTodo(1, (mockResponse as unknown) as Response);
        expect(result).toBeInstanceOf(Array);
      });
    });

    describe('createTodo', () => {
      it('should return instanceof Array', async () => {
        const result = await todoController.createTodo({ name: 'Task 3' }, (mockResponse as unknown) as Response);
        expect(result).toBeInstanceOf(Array);
      });
    });

    describe('deleteTodo', () => {
      it('should return instanceof Array', async () => {
        const result = await todoController.deleteTodo(1, (mockResponse as unknown) as Response);
        expect(result).toBeInstanceOf(Array);
      });
    });

    afterEach(() => {
      mockResponse.resetMocked();
    });
  });

  describe('Error Response', () => {
    const mockTodoService = jest.fn<TodoService, []>(() => ({
      getTodos: jest.fn().mockRejectedValue(new Error('There was an error with getTodos')),
      getTodo: jest.fn().mockRejectedValue(new Error('There was an error with getTodo')),
      createTodo: jest.fn().mockRejectedValue(new Error('There was an error with createTodo')),
      deleteTodo: jest.fn().mockRejectedValue(new Error('There was an error with deleteTodo')),
    }));

    beforeEach(() => {
      mockResponse = new MockResponse();
      todoController = new TodoController(mockTodoService());
    });

    describe('getTodos', () => {
      it('should return instanceof Array', async () => {
        await todoController.getTodos((mockResponse as unknown) as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(httpStatusCode.INTERNAL_SERVER_ERROR);
      });
    });

    describe('getTodo', () => {
      it('should return instanceof Array', async () => {
        await todoController.getTodo(1, (mockResponse as unknown) as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(httpStatusCode.INTERNAL_SERVER_ERROR);
      });
    });

    describe('createTodo', () => {
      it('should return instanceof Array', async () => {
        await todoController.createTodo({ name: 'Task 3' }, (mockResponse as unknown) as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(httpStatusCode.INTERNAL_SERVER_ERROR);
      });
    });

    describe('deleteTodo', () => {
      it('should return instanceof Array', async () => {
        await todoController.deleteTodo(1, (mockResponse as unknown) as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(httpStatusCode.INTERNAL_SERVER_ERROR);
      });
    });

    afterEach(() => {
      mockResponse.resetMocked();
    });
  });
});
