import express, { Request, Response, Router } from 'express';
import { Product, ProductStore } from '../../../models/product';
import verifyAuthToken from '../../../middleware/verifyAuthToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: parseInt(req.body.price),
      category: req.body.category,
    };
    const createdProduct = await store.create(product);
    res.json(createdProduct);
  } catch (err) {
    res.status(400).json(err);
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

const update = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: parseInt(req.body.price),
      category: req.body.category,
    };
    const updated = await store.update(parseInt(req.params.id), product);
    res.json(updated);
  } catch (error) {
    res.status(400).json(error);
  }
};

const productsRouter: Router = express.Router();

productsRouter.get('/', index);
productsRouter.get('/:id', show);
productsRouter.post('/', verifyAuthToken, create);
productsRouter.delete('/:id', verifyAuthToken, destroy);
productsRouter.put('/:id', verifyAuthToken, update);

export default productsRouter;
