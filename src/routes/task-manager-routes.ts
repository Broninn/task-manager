import { Router } from 'express';
import { TaskManagerController } from '@/controllers/tasks-manager-controller';

import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';

const taskManagerRoutes = Router();
const taskManagerController = new TaskManagerController();

taskManagerRoutes.use(ensureAuthenticated);
taskManagerRoutes.post('/', taskManagerController.create);

export { taskManagerRoutes };
