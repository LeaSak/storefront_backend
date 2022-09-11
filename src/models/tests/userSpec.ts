import { UserStore, User_DB } from '../user';

const store = new UserStore();
let testUser: User_DB;
let originalTimeout: number;

beforeAll(async (): Promise<void> => {
  testUser = await store.create({
    username: 'billbrown',
    firstname: 'bill',
    lastname: 'brown',
    password: 'fruitsalad',
  });

  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

describe('UserModel', (): void => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', (): void => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', (): void => {
    expect(store.create).toBeDefined();
  });

  it('should have an update method', (): void => {
    expect(store.create).toBeDefined();
  });

  it('should have an authenticate method', (): void => {
    expect(store.authenticate).toBeDefined();
  });

  it('create method should add a user', async (): Promise<void> => {
    expect(testUser.username).toBe('billbrown');
  });

  it('authenticate should recognise user', async (): Promise<void> => {
    const user = await store.create({
      username: 'bobbybrown',
      firstname: 'bobby',
      lastname: 'brown',
      password: 'fruitandnuts',
    });
    const result = (await store.authenticate(
      user.username,
      'fruitandnuts'
    )) || {
      username: '',
      password: '',
    };
    expect(result.username).not.toEqual('');
    expect(result.username).toEqual('bobbybrown');
  });

  it('update method should update the user data', async (): Promise<void> => {
    const updatedUser = await store.update({
      id: testUser.id,
      username: 'billblue',
      firstname: 'bill',
      lastname: 'brown',
      password: 'fruitsalad',
    });
    expect(updatedUser.username).toEqual('billblue');
  });

  it('delete method should delete the entry', async (): Promise<void> => {
    const user = await store.create({
      username: 'billybrown',
      firstname: 'billy',
      lastname: 'brown',
      password: 'strawberriesandcream',
    });
    const deletedUser = await store.delete(user.id);
    expect(deletedUser).toEqual(undefined);
  });
});

afterAll(function (): void {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
