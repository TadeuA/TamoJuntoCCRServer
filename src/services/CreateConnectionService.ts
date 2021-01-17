import { getRepository } from 'typeorm';

import Connection from '../models/Connection';

interface RequestDTO {
  office: string;
  description: string;
  value: number;
  provider_id: string;
}

class CreateConnectionService {
  public async execute({
    office,
    description,
    value,
    provider_id,
  }: RequestDTO): Promise<Connection> {
    const connectionsRepository = getRepository(Connection);

    const connection = connectionsRepository.create({
      office,
      description,
      value,
      provider_id,
    });

    await connectionsRepository.save(connection);

    return connection;
  }
}

export default CreateConnectionService;
