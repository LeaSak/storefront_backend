import express, { Router } from 'express';
import productsRouter from './api/products';
import usersRouter from './api/users';
import ordersRouter from './api/orders';

const routes: Router = express.Router();
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Main api route');
});
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/orders', ordersRouter);
export default routes;
