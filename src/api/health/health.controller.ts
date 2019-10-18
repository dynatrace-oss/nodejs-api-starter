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
