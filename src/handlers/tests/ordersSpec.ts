import supertest from 'supertest';
import { User, User_Verify } from '../../models/user';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { Order, Order_DB } from '../../models/order';
import { Product_DB } from '../../models/product';

const request: supertest.SuperTest<supertest.Test> = supertest(app);
let originalTimeout: number;
let userData: User_Verify;
const userInfo: User = {
  username: 'cherryripe',
  firstname: 'cherry',
  lastname: 'ripe',
  password: 'coconut',
};
let token: string;
let order: Order_DB;
let orderStatus: number;
const orderInfo: Order = { status: 'active', user_id: 0 };
let product: Product_DB;

beforeAll(async function () {
  const response = await request.post('/api/users').send(userInfo);
  token = response.body as string;
  userData = jwt.decode(token) as User_Verify;
  orderInfo.user_id = userData.user.id;

  const orderRequest = await request
    .post('/api/orders')
    .auth(token, { type: 'bearer' })
    .send(orderInfo)

  order = orderRequest.body;
  orderStatus = orderRequest.status;

  const productRequest = await request
    .post('/api/products')
    .auth(token, { type: 'bearer' })
    .send({
      name: 'Cherries',
      price: 2,
      category: 'Fruit',
    })
  product = productRequest.body;
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

describe('Orders', function () {
  describe('Status 200', function (): void {
    it('test request: all orders', async (): Promise<void> => {
      const response = await request
        .get('/api/orders')
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
    });
  });

  describe('Status 200', function (): void {
    it('test request: all orders by user', async (): Promise<void> => {
      const response = await request
        .get('/api/orders/' + userData.user.id)
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
    });
  });

  describe('POST user', () => {
    it('should create an order', async (): Promise<void> => {
      expect(orderStatus).toBe(200);
    });
  });

  describe('UPDATE order', () => {
    it('should update an order', async (): Promise<void> => {
      const update = await request
        .put('/api/orders/' + order.id)
        .auth(token, { type: 'bearer' })
        .send({
          status: 'pending',
          user_id: order.user_id,
        });
      expect(update.status).toBe(200);
    });
  });

  describe('ADD products to order', () => {
    it('should add a product to an order', async (): Promise<void> => {
      const update = await request
        .post('/api/orders/' + String(order.id) + '/products')
        .auth(token, { type: 'bearer' })
        .send({ quantity: 2, product_id: product.id });
      expect(update.status).toBe(200);
    });
  });

  describe('DELETE an order', () => {
    it('should delete an order', async (): Promise<void> => {
      const testOrder = await request
        .post('/api/orders')
        .auth(token, { type: 'bearer' })
        .send(orderInfo);

      const deleteOrder = await request
        .delete('/api/orders/' + testOrder.body.id)
        .auth(token, { type: 'bearer' });
      expect(deleteOrder.status).toBe(200);
    });
  });
});

afterAll(function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
