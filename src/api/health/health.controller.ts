import { controller, interfaces, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { HEALTH_CHECK_SERVICE, HealthCheckService } from './health.service';
import { HealthCheckStatus } from '@api/types';

@controller('/api/healthCheck')
export class HealthCheckController implements interfaces.Controller {
  public constructor(@inject(HEALTH_CHECK_SERVICE) private readonly healthCheckService: HealthCheckService) {}

  @httpGet('/')
  public getApiHealthCheckStatus(): HealthCheckStatus {
    return this.healthCheckService.getHealthCheck();
  }
}
