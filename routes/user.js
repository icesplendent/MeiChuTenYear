import express from 'express';
import controller from '../controller';

const userRouter = express.Router();

userRouter.post('/register', controller.user.register);
userRouter.post('/getUser', controller.user.getUser);
userRouter.post('/getUsers', controller.user.getUsers);
userRouter.post('/modifyUser', controller.user.modifyUser);
// userRouter.post('/removeUser', authentication(), controller.user.removeUser);
userRouter.post('/removeUser', controller.user.removeUser);
userRouter.post('/removeUsers', controller.user.removeUsers);
userRouter.post('/login', controller.user.login);
// userRouter.post('/getCurrentUser', authentication(), controller.user.getCurrentUser);
userRouter.post('/getCurrentUser', controller.user.getCurrentUser);

export default userRouter;
