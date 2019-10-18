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
