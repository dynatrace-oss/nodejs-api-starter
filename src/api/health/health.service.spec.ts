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
import { HealthCheckStatus } from '@api/types';
import { ApiHealthCheckService } from './health.service';

describe('ApiHealthCheckService', () => {
  const healthCheckStatusKeys = ['author', 'commit', 'buildDate', 'uptime'];

  describe('getHealthCheck', () => {
    const configurationSetting: Omit<HealthCheckStatus, 'uptime'> = {
      author: 'first.last@email.com',
      commit: 'somecommitsha',
      buildDate: 'September 21st, 2021 11:22:33 GMT',
    };
    const healthCheckService = new ApiHealthCheckService(configurationSetting);

    it(`should return an Object with ${healthCheckStatusKeys} attributes`, () => {
      expect(Object.keys(healthCheckService.getHealthCheck())).toStrictEqual(healthCheckStatusKeys);
    });
  });
});
