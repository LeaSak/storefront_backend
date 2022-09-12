import express, { Router } from 'express';
import UserHandler from '../../../handlers/userHandler';
import verifyAuthToken from '../../../middleware/verifyAuthToken';

const userRouter: Router = express.Router();
userRouter.get('/', verifyAuthToken, UserHandler.index);
userRouter.get('/:id', verifyAuthToken, UserHandler.show);
userRouter.post('/', UserHandler.create);
userRouter.put('/:id', verifyAuthToken, UserHandler.update);
userRouter.delete('/:id', verifyAuthToken, UserHandler.destroy);
userRouter.post('/authenticate', UserHandler.authenticate);

export default userRouter;
