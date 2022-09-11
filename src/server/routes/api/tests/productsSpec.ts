import supertest from 'supertest';
import app from '../../../../server';

const request: supertest.SuperTest<supertest.Test> = supertest(app);
let token: string;
let originalTimeout: number;

beforeAll(async function () {
  const result = await request.post('/api/users').send({
    username: 'juliesmith',
    firstname: 'julie',
    lastname: 'smith',
    password: 'applecrumble',
  });
  token = result.body;
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

describe('', function () {
  describe('GET products', function (): void {
    it('test request: all products', async (): Promise<void> => {
      const response = await request.get('/api/products');
      expect(response.status).toBe(200);
    });
  });

  describe('POST /products', () => {
    it('should create a product', async (): Promise<void> => {
      const response = await request
        .post('/api/products')
        .send({
          name: 'Pineapple',
          price: 2,
          category: 'Fruit',
        })
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
    });
  });

  describe('GET product', function (): void {
    it('test request: product by id', async (): Promise<void> => {
      const productReponse = await request
        .post('/api/products')
        .send({
          name: 'Papaya',
          price: 2,
          category: 'Fruit',
        })
        .auth(token, { type: 'bearer' });
      const response = await request.get(
        '/api/products/' + productReponse.body.id
      );
      expect(response.status).toBe(200);
    });
  });

  describe('DELETE product', function (): void {
    it('test request: product by id', async (): Promise<void> => {
      const productReponse = await request
        .post('/api/products')
        .send({
          name: 'Tomato',
          price: 2,
          category: 'Fruit',
        })
        .auth(token, { type: 'bearer' });
      const response = await request
        .delete('/api/products/' + productReponse.body.id)
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
    });
  });

  describe('UPDATE product', function (): void {
    it('test request: update product by id', async (): Promise<void> => {
      const productReponse = await request
        .post('/api/products')
        .send({
          name: 'Passionfruit',
          price: 2,
          category: 'Fruit',
        })
        .auth(token, { type: 'bearer' });
      const response = await request
        .put('/api/products/' + productReponse.body.id)
        .send({
          name: 'Passionfruit',
          price: 4,
          category: 'Fruit',
        })
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
    });
  });
});

afterAll(function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
