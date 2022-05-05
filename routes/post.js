import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const postRouter = express.Router();

postRouter.post('/addPost', controller.post.addPost);
postRouter.post('/getPost', auth(true), controller.post.getPost);
postRouter.post('/getPosts', auth(true), controller.post.getPosts);
postRouter.post('/removePosts', controller.post.removePosts);

export default postRouter;
