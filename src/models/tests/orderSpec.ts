import { OrderStore, Order_DB } from '../order';
import { UserStore, User_DB } from '../user';
import { ProductStore } from '../product';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

let testOrder: Order_DB;
let testOrder2: Order_DB;

let testUser: User_DB;

let originalTimeout: number;

beforeAll(async (): Promise<void> => {
  testUser = await userStore.create({
    username: 'susancherry',
    firstname: 'susan',
    lastname: 'cherry',
    password: 'bananasplit',
  });
  testOrder = await store.create({
    status: 'active',
    user_id: testUser.id,
  });
  testOrder2 = await store.create({
    status: 'complete',
    user_id: testUser.id,
  });
  await productStore.create({
    name: 'Cherries',
    price: 2,
    category: 'Fruit',
  });
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

describe('OrderModel', (): void => {
  it('should have an index method', (): void => {
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

  it('create method should add an order', async (): Promise<void> => {
    expect(testOrder.status).toEqual('active');
  });

  it('should show orders by user', async (): Promise<void> => {
    const orders = await store.show(testUser.id);
    expect(orders.length).not.toBe(0);
  });

  it('update method should update the order data', async (): Promise<void> => {
    const updatedOrder = await store.update(testOrder.id, {
      status: 'complete',
      user_id: testUser.id,
    });
    expect(updatedOrder.status).toEqual('complete');
  });

  it('delete method should delete the entry', async (): Promise<void> => {
    const deletedOrder = await store.delete(testOrder2.id);
    expect(deletedOrder).toEqual(undefined);
  });
});

afterAll(function (): void {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
