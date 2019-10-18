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
