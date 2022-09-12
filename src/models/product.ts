import Client from '../database';

export interface Product {
  name: string;
  price: number;
  category: string;
}

export interface Product_DB extends Product {
  readonly id: number;
}

export class ProductStore {
  static async index(): Promise<Product_DB[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  static async show(id: number): Promise<Product_DB> {
    try {
      if (Number.isNaN(id) || typeof id == 'undefined' || id == null) {
        throw Error('Missing id');
      }
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  static async create(product: Product): Promise<Product_DB> {
    try {
      if (!product || !product.name || !product.category) {
        throw Error('Missing product information');
      }
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);

      const createdProduct = result.rows[0];

      conn.release();

      return createdProduct;
    } catch (err) {
      throw new Error(`Could not add new product. Error: ${err}`);
    }
  }

  static async update(id: number, product: Product): Promise<Product_DB> {
    try {
      if (Number.isNaN(id) || !product || !product.name || !product.category) {
        throw Error('Missing product information');
      }

      const sql =
        'UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4) RETURNING *;';
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
        id,
      ]);
      const updatedProduct = result.rows[0];

      conn.release();

      return updatedProduct;
    } catch (err) {
      throw new Error(`Could not update product. Error: ${err}`);
    }
  }

  static async delete(id: number): Promise<Product_DB> {
    try {
      if (Number.isNaN(id) || typeof id == 'undefined' || id == null) {
        throw Error('Missing id');
      }
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const deletedProduct = result.rows[0];

      conn.release();

      return deletedProduct;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
