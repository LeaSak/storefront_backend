import supertest from 'supertest';
import { User, User_Verify } from '../../../../models/user';
import app from '../../../../server';
import jwt from 'jsonwebtoken';

const request: supertest.SuperTest<supertest.Test> = supertest(app);
let originalTimeout: number;
let userData: User_Verify;
const userInfo: User = {
  username: 'violetcrumble',
  firstname: 'violet',
  lastname: 'crumble',
  password: 'crunch',
};
let token: string;
let status: number;

beforeAll(async function () {
  const response = await request.post('/api/users').send(userInfo);
  status = response.status;
  token = response.body as string;
  userData = jwt.decode(token) as User_Verify;
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

describe('Users', function () {
  describe('GET users', function (): void {
    it('test request: all users', async (): Promise<void> => {
      const response = await request
        .get('/api/users')
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
    });
  });

  describe('GET user by id', function (): void {
    it('test request: user by id', async (): Promise<void> => {
      const response = await request
        .get('/api/users/' + userData.user.id)
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
    });
  });

  describe('POST user', () => {
    it('should create a user', async (): Promise<void> => {
      expect(status).toBe(200);
    });
  });

  describe('UPDATE user', () => {
    it('should update a user', async (): Promise<void> => {
      const update = await request
        .put('/api/users/' + userData.user.id)
        .send({
          username: userData.user.username,
          firstname: userData.user.firstname,
          lastname: userData.user.lastname,
          password: 'crunchy',
        })
        .auth(token, { type: 'bearer' });
      expect(update.status).toBe(200);
    });
  });

  describe('DELETE user', () => {
    it('should delete a user', async (): Promise<void> => {
      const deleteUser = await request
        .delete('/api/users/' + userData.user.id)
        .auth(token, { type: 'bearer' });
      expect(deleteUser.status).toBe(200);
    });
  });
});

afterAll(function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
