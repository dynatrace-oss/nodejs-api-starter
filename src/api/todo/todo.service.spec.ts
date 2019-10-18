import 'reflect-metadata';
import { TodoRepository } from './todo.model';
import { ApiTodoService } from './todo.service';

describe('ApiTodoService', () => {
  const todoId = 1;
  const mockTodoRepository = jest.fn<Partial<TodoRepository>, []>(() => ({
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue([]),
    destroy: jest.fn().mockResolvedValue([]),
  }));

  describe('getTodos', () => {
    it('should call downstream repository method', async () => {
      const todoRepository = mockTodoRepository();
      const apiTodoService = new ApiTodoService(todoRepository as TodoRepository);
      await apiTodoService.getTodos();
      expect(todoRepository.findAll).toHaveBeenCalled();
    });

    it('should return an instanceOf Array', async () => {
      const todoRepository = mockTodoRepository();
      const apiTodoService = new ApiTodoService(todoRepository as TodoRepository);
      const result = await apiTodoService.getTodos();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getTodo', () => {
    it('should call downstream repository method', async () => {
      const todoRepository = mockTodoRepository();
      const apiTodoService = new ApiTodoService(todoRepository as TodoRepository);

      await apiTodoService.getTodo(1);
      expect(todoRepository.findOne).toHaveBeenCalled();
    });

    it('should return an instanceOf Object', async () => {
      const todoRepository = mockTodoRepository();
      const apiTodoService = new ApiTodoService(todoRepository as TodoRepository);
      const result = await apiTodoService.getTodo(todoId);
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('createTodo', () => {
    const todoName = 'sometodoname';

    it('should call downstream repository method', async () => {
      const todoRepository = mockTodoRepository();
      const apiTodoService = new ApiTodoService(todoRepository as TodoRepository);
      await apiTodoService.createTodo(todoName);
      expect(todoRepository.create).toHaveBeenCalled();
    });

    it('should return an instanceOf Array', async () => {
      const todoRepository = mockTodoRepository();
      const apiTodoService = new ApiTodoService(todoRepository as TodoRepository);
      const result = await apiTodoService.createTodo(todoName);
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('deleteTodo', () => {
    it('should call downstream repository method', async () => {
      const todoRepository = mockTodoRepository();
      const apiTodoService = new ApiTodoService(todoRepository as TodoRepository);
      await apiTodoService.deleteTodo(todoId);
      expect(todoRepository.destroy).toHaveBeenCalled();
    });

    it('should return an instanceOf Array', async () => {
      const todoRepository = mockTodoRepository();
      const apiTodoService = new ApiTodoService(todoRepository as TodoRepository);
      const result = await apiTodoService.deleteTodo(todoId);
      expect(result).toBeInstanceOf(Array);
    });
  });
});
