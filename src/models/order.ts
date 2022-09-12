import Client from '../database';

export interface Order {
  status: string;
  user_id: number;
}

export interface Order_DB extends Order {
  readonly id: number;
}

export interface OrderProduct extends Order_DB {
  product_id: number;
}

export class OrderStore {
  static async index(): Promise<Order_DB[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  static async show(user_id: number): Promise<Order_DB[]> {
    try {
      if (
        Number.isNaN(user_id) ||
        typeof user_id == 'undefined' ||
        user_id == null
      ) {
        throw Error('Missing id');
      }
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${user_id}. Error: ${err}`);
    }
  }

  static async create(order: Order): Promise<Order_DB> {
    try {
      if (!order || !order.status || Number.isNaN(order.user_id)) {
        throw Error('Missing order information');
      }
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [order.status, order.user_id]);

      const createdOrder = result.rows[0];

      conn.release();

      return createdOrder;
    } catch (err) {
      throw new Error(`Could not create new order. Error: ${err}`);
    }
  }

  static async update(id: number, order: Order): Promise<Order_DB> {
    try {
      if (
        Number.isNaN(id) ||
        !order ||
        !order.status ||
        Number.isNaN(order.user_id) ||
        typeof order.user_id == 'undefined' ||
        order.user_id == null
      ) {
        throw Error('Missing order information');
      }

      const sql =
        'UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *;';
      const conn = await Client.connect();
      const result = await conn.query(sql, [order.status, order.user_id, id]);
      const updatedOrder = result.rows[0];

      conn.release();

      return updatedOrder;
    } catch (err) {
      throw new Error(`Could not update order. Error: ${err}`);
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      if (Number.isNaN(id) || typeof id == 'undefined' || id == null) {
        throw Error('Missing id');
      }

      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const deletedOrder = result.rows[0];

      conn.release();

      return deletedOrder;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
