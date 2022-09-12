import { Request, Response } from 'express';
import { Product, Product_DB, ProductStore } from '../models/product';

export default class ProductHandler {
  static async index(
    _req: Request,
    res: Response
  ): Promise<Product_DB[] | void> {
    try {
      const products = await ProductStore.index();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async show(req: Request, res: Response): Promise<Product_DB | void> {
    try {
      const product = await ProductStore.show(parseInt(req.params.id));
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async create(req: Request, res: Response): Promise<Product_DB | void> {
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
  }

  static async destroy(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await ProductStore.delete(parseInt(req.params.id));
      res.json(deleted);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async update(req: Request, res: Response): Promise<Product_DB | void> {
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
  }
}
