import express, { Router } from 'express';
import ProductHandler from '../../../handlers/productHandler';
import verifyAuthToken from '../../../middleware/verifyAuthToken';

const productsRouter: Router = express.Router();

productsRouter.get('/', ProductHandler.index);
productsRouter.get('/:id', ProductHandler.show);
productsRouter.post('/', verifyAuthToken, ProductHandler.create);
productsRouter.delete('/:id', verifyAuthToken, ProductHandler.destroy);
productsRouter.put('/:id', verifyAuthToken, ProductHandler.update);

export default productsRouter;
