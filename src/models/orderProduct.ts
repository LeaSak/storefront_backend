import Client from '../database';
import { Order_DB } from '../models/order';

export interface OrderProduct extends Order_DB {
  product_id: number;
}

export class OrderProductStore {
  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<OrderProduct> {
    try {
      if (
        Number.isNaN(quantity) ||
        typeof quantity == 'undefined' ||
        quantity == null ||
        Number.isNaN(orderId) ||
        typeof orderId == 'undefined' ||
        orderId == null ||
        Number.isNaN(productId) ||
        typeof productId == 'undefined' ||
        productId == null
      ) {
        throw 'Missing parameters';
      }
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
