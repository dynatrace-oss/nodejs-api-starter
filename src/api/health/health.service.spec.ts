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
