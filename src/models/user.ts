import bcrypt from 'bcrypt';
import Client from '../database';

export interface User {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface User_DB extends User {
  readonly id: number;
}

export interface User_Verify {
  user: User_DB;
  iat: number;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to read all users: ${err}`);
    }
  }

  async create(user: User): Promise<User_DB> {
    try {
      if (
        !user ||
        !user.username ||
        !user.firstname ||
        !user.lastname ||
        !user.password
      ) {
        throw Error('Missing user parameters');
      }
      const sql =
        'INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await Client.connect();

      const hash = bcrypt.hashSync(
        user.password + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        hash,
      ]);

      const createdUser = result.rows[0];

      conn.release();

      return createdUser;
    } catch (err) {
      throw new Error(`Could not add new user (${user.username}): ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      if (Number.isNaN(id) || typeof id == 'undefined' || id == null) {
        throw Error('Missing id');
      }
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [parseInt(id)]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`);
    }
  }

  async update(user: User_DB): Promise<User_DB> {
    try {
      if (
        !user ||
        Number.isNaN(user.id) ||
        !user.username ||
        !user.firstname ||
        !user.lastname ||
        !user.password
      ) {
        throw Error('Missing parameters');
      }
      const hash = bcrypt.hashSync(
        user.password + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const sql =
        'UPDATE users SET username = $2, firstname = $3, lastname = $4, password = $5 WHERE id=$1 RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        user.id,
        user.username,
        user.firstname,
        user.lastname,
        hash,
      ]);
      const updatedUser = result.rows[0];
      conn.release();
      return updatedUser;
    } catch (err) {
      throw new Error(`unable to update user ${user.id}: ${err}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      if (Number.isNaN(id) || typeof id == 'undefined' || id == null) {
        throw Error('Missing id');
      }

      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const deletedUser = result.rows[0];

      conn.release();

      return deletedUser;
    } catch (err) {
      throw new Error(`unable delete user (${id}): ${err}`);
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<User_DB | null> {
    if (!username || !password) {
      throw Error('Missing username and or password');
    }

    const conn = await Client.connect();
    const sql = 'SELECT * FROM users WHERE username=($1)';

    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];
      if (
        bcrypt.compareSync(
          password + process.env.BCRYPT_PASSWORD,
          user.password
        )
      ) {
        return user;
      }
    }
    return null;
  }
}
