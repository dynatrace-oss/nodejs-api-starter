import 'reflect-metadata';

import { Response as MockResponse } from 'jest-express/lib/response';
import { HealthCheckService } from './health.service';
import { HealthCheckController } from './health.controller';

describe('HealthController', () => {
  let mockResponse: MockResponse;
  let healthCheckController: HealthCheckController;

  const mockHealthCheckService = jest.fn<HealthCheckService, []>(() => ({
    getHealthCheck: jest.fn().mockResolvedValue({}),
  }));

  describe('Success Response', () => {
    beforeEach(() => {
      mockResponse = new MockResponse();
      healthCheckController = new HealthCheckController(mockHealthCheckService());
    });

    it('should return a response that is not null or undefined', () => {
      expect(healthCheckController.getApiHealthCheckStatus()).not.toBeNull();
      expect(healthCheckController.getApiHealthCheckStatus()).not.toBeUndefined();
    });

    afterEach(() => {
      mockResponse.resetMocked();
    });
  });
});
