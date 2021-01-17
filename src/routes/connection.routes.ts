import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateConnectionService from '../services/CreateConnectionService';
import ConnectionRepository from '../models/Connection';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const connectionRouter = Router();

connectionRouter.use(ensureAuthenticated);

connectionRouter.get('/', async (request, response) => {
  const connectionRepository = getRepository(ConnectionRepository);
  const connection = await connectionRepository.find();

  return response.json(connection);
});

connectionRouter.post('/', async (request, response) => {
  const { provider_id, office, description, value } = request.body;
  const createAppointment = new CreateConnectionService();
  const appointment = await createAppointment.execute({
    office,
    description,
    value,
    provider_id,
  });
  return response.json(appointment);
});

export default connectionRouter;
