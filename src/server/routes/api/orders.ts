import express, { Router } from 'express';
import OrderStoreHandler from '../../../handlers/orderHandler';
import verifyAuthToken from '../../../middleware/verifyAuthToken';

const ordersRouter: Router = express.Router();

ordersRouter.get('/', verifyAuthToken, OrderStoreHandler.index);
ordersRouter.get('/:user_id', verifyAuthToken, OrderStoreHandler.show);
ordersRouter.post('/', verifyAuthToken, OrderStoreHandler.create);
ordersRouter.put('/:id', verifyAuthToken, OrderStoreHandler.update);
ordersRouter.post(
  '/:id/products',
  verifyAuthToken,
  OrderStoreHandler.addProduct
);
ordersRouter.delete('/:id', verifyAuthToken, OrderStoreHandler.destroy);

export default ordersRouter;
