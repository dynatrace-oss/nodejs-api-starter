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
import { injectable, inject } from 'inversify';
import process from 'process';
import { HealthCheckStatus } from '@api/types';

export const HEALTH_CHECK_SERVICE: symbol = Symbol.for('HealthCheckService');
export const CONFIGURATION_SETTING: symbol = Symbol.for('ConfigurationSetting');

/**
 * @interface
 */
export interface HealthCheckService {
  /**
   * Returns the health check status for the API service
   *
   * @returns A Promise that resolves to the HealthCheckStatus
   */
  getHealthCheck(): HealthCheckStatus;
}

@injectable()
export class ApiHealthCheckService implements HealthCheckService {
  public constructor(
    @inject(CONFIGURATION_SETTING) private readonly configuration: Omit<HealthCheckStatus, 'uptime'>,
  ) {}

  public getHealthCheck(): HealthCheckStatus {
    return {
      author: this.configuration.author,
      commit: this.configuration.commit,
      buildDate: this.configuration.buildDate,
      uptime: process.uptime(),
    };
  }
}
