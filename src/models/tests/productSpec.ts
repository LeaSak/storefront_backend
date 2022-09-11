import { ProductStore, Product_DB } from '../product';
const store = new ProductStore();
let originalTimeout: number;
let raspberries: Product_DB;

beforeAll(async (): Promise<void> => {
  raspberries = await store.create({
    name: 'Raspberries',
    price: 2,
    category: 'Fruit',
  });
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

describe('ProductModel', (): void => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', (): void => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', (): void => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', (): void => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', (): void => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a product', async (): Promise<void> => {
    const result = await store.create({
      name: 'Bananas',
      price: 1,
      category: 'Fruit',
    });
    expect(result).toEqual({
      id: result.id,
      name: 'Bananas',
      price: 1,
      category: 'Fruit',
    });
  });

  it('index method should list all products', async (): Promise<void> => {
    const result = await store.index();
    expect(result.length).not.toEqual(0);
  });

  it('show method should get product by id', async (): Promise<void> => {
    const result = await store.show(raspberries.id);
    expect(result.id).toBe(raspberries.id);
  });

  it('update method should update product by id', async (): Promise<void> => {
    const result = await store.update(raspberries.id, {
      name: raspberries.name,
      price: 3,
      category: raspberries.category,
    });
    expect(result.price).toEqual(3);
  });
});

afterAll(function (): void {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
