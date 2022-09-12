import { ProductStore, Product_DB } from '../product';

let originalTimeout: number;
let raspberries: Product_DB;

beforeAll(async (): Promise<void> => {
  raspberries = await ProductStore.create({
    name: 'Raspberries',
    price: 2,
    category: 'Fruit',
  });
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

describe('ProductModel', (): void => {
  it('should have an index method', () => {
    expect(ProductStore.index).toBeDefined();
  });

  it('should have a show method', (): void => {
    expect(ProductStore.show).toBeDefined();
  });

  it('should have a create method', (): void => {
    expect(ProductStore.create).toBeDefined();
  });

  it('should have a update method', (): void => {
    expect(ProductStore.update).toBeDefined();
  });

  it('should have a delete method', (): void => {
    expect(ProductStore.delete).toBeDefined();
  });

  it('create method should add a product', async (): Promise<void> => {
    const result = await ProductStore.create({
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
    const result = await ProductStore.index();
    expect(result.length).not.toEqual(0);
  });

  it('show method should get product by id', async (): Promise<void> => {
    const result = await ProductStore.show(raspberries.id);
    expect(result.id).toBe(raspberries.id);
  });

  it('update method should update product by id', async (): Promise<void> => {
    const result = await ProductStore.update(raspberries.id, {
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
