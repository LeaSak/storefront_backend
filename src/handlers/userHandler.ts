import { Request, Response } from 'express';
import { User, User_DB, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

export default class UserHandler {
  static index = async (req: Request, res: Response) => {
    try {
      const users = await UserStore.index();
      res.json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  static show = async (req: Request, res: Response) => {
    try {
      const user = await UserStore.show(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  static create = async (req: Request, res: Response) => {
    const user: User = {
      username: req.body.username as string,
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };
    try {
      const createdUser = await UserStore.create(user);
      const token = jwt.sign(
        { user: createdUser },
        process.env.TOKEN_SECRET as string
      );
      res.json(token);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  static update = async (req: Request, res: Response): Promise<void> => {
    const user: User_DB = {
      id: parseInt(req.params.id) as number,
      username: req.body.username as string,
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };
    try {
      await UserStore.update(user);
      const token = jwt.sign(
        { user: user },
        process.env.TOKEN_SECRET as string
      );
      res.status(200).json(token);
    } catch (e) {
      res.status(500).json(e);
    }
  };

  static destroy = async (req: Request, res: Response) => {
    try {
      const deleted = await UserStore.delete(parseInt(req.params.id));
      res.json(deleted);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  static authenticate = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
      username: req.body.username as string,
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };
    try {
      const result = await UserStore.authenticate(user.username, user.password);
      const token = jwt.sign(
        { user: result },
        process.env.TOKEN_SECRET as string
      );
      res.json(token);
    } catch (error) {
      res.status(401).json(error);
    }
  };
}
