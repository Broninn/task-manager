import { Request, Response } from 'express';

class TaskManagerController {
  create(request: Request, response: Response) {
    return response.json({ message: 'ok' });
  }
}

export { TaskManagerController };
