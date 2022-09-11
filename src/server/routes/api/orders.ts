import express, { Request, Response, Router } from 'express';
import { Order, OrderStore } from '../../../models/order';
import { OrderProductStore } from '../../../models/orderProduct';
import verifyAuthToken from '../../../middleware/verifyAuthToken';

const store = new OrderStore();
const addProductStore = new OrderProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await store.show(parseInt(req.params.user_id));
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const createdProduct = await store.create(order);
    res.json(createdProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const orderId: string = req.params.id;
  const productId: number = req.body.product_id;
  const quantity: number = req.body.quantity;

  try {
    const addedProduct = await addProductStore.addProduct(
      quantity,
      parseInt(orderId),
      productId
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await store.delete(parseInt(req.params.id));
    res.json(deleted);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const updated = await store.update(parseInt(req.params.id), order);
    res.json(updated);
  } catch (error) {
    res.status(400).json(error);
  }
};

const ordersRouter: Router = express.Router();

ordersRouter.get('/', verifyAuthToken, index);
ordersRouter.get('/:user_id', verifyAuthToken, show);
ordersRouter.post('/', verifyAuthToken, create);
ordersRouter.put('/:id', verifyAuthToken, update);
ordersRouter.post('/:id/products', verifyAuthToken, addProduct);
ordersRouter.delete('/:id', verifyAuthToken, destroy);

export default ordersRouter;
