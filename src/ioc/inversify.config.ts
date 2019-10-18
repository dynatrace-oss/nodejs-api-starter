/* Load Controllers */
import '../api';

import { Container } from 'inversify';
import { healthCheckModule } from '@api/api/health/health.module';
import { todoModule } from '@api/api/todo/todo.module';

export default (): Container => {
  const container = new Container();
  /* Load Modules */
  container.load(healthCheckModule(), todoModule());
  return container;
};
