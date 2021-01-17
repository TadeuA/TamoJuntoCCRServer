import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  fantasy: string;
  document: number;
  location: string;
  description: string;
  phone: string;
  role: 'skilled' | 'company ' | 'admin' | 'instructor';
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    fantasy,
    document,
    location,
    description,
    phone,
    role,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      fantasy,
      document,
      location,
      description,
      phone,
      role,
    });

    await usersRepository.save(user);
    console.log(user);

    return user;
  }
}

export default CreateUserService;
