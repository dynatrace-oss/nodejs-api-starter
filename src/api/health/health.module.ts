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
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HEALTH_CHECK_SERVICE,
  ApiHealthCheckService,
  HealthCheckService,
  CONFIGURATION_SETTING,
} from './health.service';
import { ContainerModule, interfaces } from 'inversify';

export const healthCheckModule = (): ContainerModule => {
  return new ContainerModule(
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
      /* Bind Services */
      bind<HealthCheckService>(HEALTH_CHECK_SERVICE).to(ApiHealthCheckService);

      bind(CONFIGURATION_SETTING).toConstantValue({
        author: process.env.AUTHOR,
        commit: process.env.COMMIT_SHA,
        buildDate: new Date().toString(),
      });
    },
  );
};
