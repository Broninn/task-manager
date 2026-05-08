import { Router } from 'express';
import { usersRoutes } from './users-routes';
import { sessionsRoutes } from './sessions-routes';
import { taskManagerRoutes } from './task-manager-routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/task-manager', taskManagerRoutes);

export { routes };
