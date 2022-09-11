import express, { Request, Response, Router } from 'express';
import { User, User_DB, UserStore } from '../../../models/user';
import verifyAuthToken from '../../../middleware/verifyAuthToken';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username as string,
    firstname: req.body.firstname as string,
    lastname: req.body.lastname as string,
    password: req.body.password as string,
  };
  try {
    const createdUser = await store.create(user);
    const token = jwt.sign(
      { user: createdUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const user: User_DB = {
    id: parseInt(req.params.id) as number,
    username: req.body.username as string,
    firstname: req.body.firstname as string,
    lastname: req.body.lastname as string,
    password: req.body.password as string,
  };
  try {
    await store.update(user);
    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    res.status(200).json(token);
  } catch (e) {
    res.status(500).json(e);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(parseInt(req.params.id));
    res.json(deleted);
  } catch (error) {
    res.status(400).json(error);
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    username: req.body.username as string,
    firstname: req.body.firstname as string,
    lastname: req.body.lastname as string,
    password: req.body.password as string,
  };
  try {
    const result = await store.authenticate(user.username, user.password);
    const token = jwt.sign(
      { user: result },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (error) {
    res.status(401).json(error);
  }
};

const userRouter: Router = express.Router();
userRouter.get('/', verifyAuthToken, index);
userRouter.get('/:id', verifyAuthToken, show);
userRouter.post('/', create);
userRouter.put('/:id', verifyAuthToken, update);
userRouter.delete('/:id', verifyAuthToken, destroy);
userRouter.post('/authenticate', authenticate);

export default userRouter;
