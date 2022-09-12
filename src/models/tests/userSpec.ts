import { UserStore, User_DB } from '../user';

let testUser: User_DB;
let originalTimeout: number;

beforeAll(async (): Promise<void> => {
  testUser = await UserStore.create({
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
    expect(UserStore.index).toBeDefined();
  });

  it('should have a show method', (): void => {
    expect(UserStore.show).toBeDefined();
  });

  it('should have a create method', (): void => {
    expect(UserStore.create).toBeDefined();
  });

  it('should have an update method', (): void => {
    expect(UserStore.create).toBeDefined();
  });

  it('should have an authenticate method', (): void => {
    expect(UserStore.authenticate).toBeDefined();
  });

  it('create method should add a user', async (): Promise<void> => {
    expect(testUser.username).toBe('billbrown');
  });

  it('authenticate should recognise user', async (): Promise<void> => {
    const user = await UserStore.create({
      username: 'bobbybrown',
      firstname: 'bobby',
      lastname: 'brown',
      password: 'fruitandnuts',
    });
    const result = (await UserStore.authenticate(
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
    const updatedUser = await UserStore.update({
      id: testUser.id,
      username: 'billblue',
      firstname: 'bill',
      lastname: 'brown',
      password: 'fruitsalad',
    });
    expect(updatedUser.username).toEqual('billblue');
  });

  it('delete method should delete the entry', async (): Promise<void> => {
    const user = await UserStore.create({
      username: 'billybrown',
      firstname: 'billy',
      lastname: 'brown',
      password: 'strawberriesandcream',
    });
    const deletedUser = await UserStore.delete(user.id);
    expect(deletedUser).toEqual(undefined);
  });
});

afterAll(function (): void {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
