import { Request, Response } from 'express';
import { User, User_DB, UserStore, User_Verify } from '../models/user';
import jwt from 'jsonwebtoken';

export default class UserHandler {
  static async index(req: Request, res: Response): Promise<User_DB | void> {
    try {
      const users = await UserStore.index();
      res.json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async show(req: Request, res: Response): Promise<User_DB | void> {
    try {
      const user = await UserStore.show(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async create(req: Request, res: Response): Promise<string | void> {
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
  }

  static async update(req: Request, res: Response): Promise<string | void> {
    const user: User_DB = {
      id: parseInt(req.params.id) as number,
      username: req.body.username as string,
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };
    try {
      const authorizationHeader = req.headers.authorization as string;
      const headerToken = authorizationHeader ? authorizationHeader.split(' ')[1] : '';
      const decodedData = jwt.verify(headerToken, process.env.TOKEN_SECRET as string) as User_Verify;
      
      if (decodedData.user.id !== user.id){
        throw Error("User can only update own user data");
      }
      
      await UserStore.update(user);
      const token = jwt.sign(
        { user: user },
        process.env.TOKEN_SECRET as string
      );
      res.status(200).json(token);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async destroy(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await UserStore.delete(parseInt(req.params.id));
      res.json(deleted);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async authenticate(
    req: Request,
    res: Response
  ): Promise<string | void> {
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
  }
}
