import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import userView from '../views/User';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    password,
    fantasy,
    document,
    location,
    description,
    phone,
    role,
  } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    fantasy,
    document,
    location,
    description,
    phone,
    role,
  });
  // delete user.password;
  // Com a atualização do TypeScript, isso se faz necessário
  console.log(user);

  return response.json(userView.render(user));
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(userView.render(user));
  },
);

export default usersRouter;
