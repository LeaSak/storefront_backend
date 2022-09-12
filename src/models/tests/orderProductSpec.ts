import { OrderStore, Order_DB } from '../order';
import { UserStore, User_DB } from '../user';
import { ProductStore, Product_DB } from '../product';
import { OrderProductStore } from '../orderProduct';

let testOrder: Order_DB;

let testUser: User_DB;

let testProduct: Product_DB;

let originalTimeout: number;

beforeAll(async (): Promise<void> => {
  testUser = await UserStore.create({
    username: 'belindaberry',
    firstname: 'belinda',
    lastname: 'berry',
    password: 'gelato',
  });
  testOrder = await OrderStore.create({
    status: 'active',
    user_id: testUser.id,
  });
  testProduct = await ProductStore.create({
    name: 'Papaya',
    price: 5,
    category: 'Fruit',
  });
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

describe('OrderModel', (): void => {
  it('should have an addProduct method', (): void => {
    expect(OrderProductStore.addProduct).toBeDefined();
  });

  it('addproduct method should add product to order', async (): Promise<void> => {
    const updatedOrder = await OrderProductStore.addProduct(
      1,
      testOrder.id,
      testProduct.id
    );
    expect(updatedOrder.product_id).toEqual(testProduct.id);
  });
});

afterAll(function (): void {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
