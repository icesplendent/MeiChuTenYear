import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', controller.user.register);
userRouter.post('/getUser', controller.user.getUser);
userRouter.post('/getUsers', controller.user.getUsers);
userRouter.post('/modifyCurrentUser', auth(true), controller.user.modifyCurrentUser);
userRouter.post('/removeUser', auth(true), controller.user.removeUser);
userRouter.post('/removeUsers', auth(true), controller.user.removeUsers);
userRouter.post('/login', controller.user.login);
userRouter.post('/getCurrentUser', auth(), controller.user.getCurrentUser);

export default userRouter;
