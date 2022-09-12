import { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

export default class ProductHandler {
  static index = async (_req: Request, res: Response) => {
    try {
      const products = await ProductStore.index();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  static show = async (req: Request, res: Response) => {
    try {
      const product = await ProductStore.show(parseInt(req.params.id));
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const product: Product = {
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category,
      };
      const createdProduct = await ProductStore.create(product);
      res.json(createdProduct);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  static destroy = async (req: Request, res: Response) => {
    try {
      const deleted = await ProductStore.delete(parseInt(req.params.id));
      res.json(deleted);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  static update = async (req: Request, res: Response) => {
    try {
      const product: Product = {
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category,
      };
      const updated = await ProductStore.update(
        parseInt(req.params.id),
        product
      );
      res.json(updated);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}
