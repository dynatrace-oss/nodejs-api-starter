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
