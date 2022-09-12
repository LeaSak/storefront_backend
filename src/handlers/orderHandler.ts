import { Request, Response } from 'express';
import { Order, Order_DB, OrderStore } from '../models/order';
import { OrderProductStore } from '../models/orderProduct';
import { OrderProduct } from '../models/orderProduct';

export default class OrderHandler {
  static async index(req: Request, res: Response): Promise<Order_DB[] | void> {
    try {
      const orders = await OrderStore.index();
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async show(req: Request, res: Response): Promise<Order_DB[] | void> {
    try {
      const order = await OrderStore.show(parseInt(req.params.user_id));
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async create(req: Request, res: Response): Promise<Order_DB | void> {
    try {
      const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id,
      };
      const createdProduct = await OrderStore.create(order);
      res.json(createdProduct);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  static async addProduct(
    req: Request,
    res: Response
  ): Promise<OrderProduct | void> {
    const orderId: string = req.params.id;
    const productId: number = req.body.product_id;
    const quantity: number = req.body.quantity;

    try {
      const addedProduct = await OrderProductStore.addProduct(
        quantity,
        parseInt(orderId),
        productId
      );
      res.json(addedProduct);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }

  static async destroy(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await OrderStore.delete(parseInt(req.params.id));
      res.json(deleted);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id,
      };
      const updated = await OrderStore.update(parseInt(req.params.id), order);
      res.json(updated);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
