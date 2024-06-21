import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import mysql2 from "mysql2";
import { User } from "../models/user";
import { DatabaseService } from "./db-service";
import { DatabaseMapping } from "./mapping-database";
import { format } from 'date-fns';


export class UserService {

  private readonly dbService: DatabaseService;
  constructor() {
    this.dbService = new DatabaseService;
  }

  public async getUsers(): Promise<User[]> {
    const connection = await this.dbService.getConnection();
    try {
      const [results] = await connection.query<RowDataPacket[]>('SELECT * FROM user;');
      return DatabaseMapping.mapUsers(results);
    }
    finally {
      connection.release();
    }
  }

  public async getUserById(userId: number): Promise<User> {
    const connection = await this.dbService.getConnection();
    try {
      const [results] = await connection.query<RowDataPacket[]>(`SELECT * FROM user where user_id ='${userId}' LIMIT 1;`);
      return DatabaseMapping.mapUser(results[0]);
    }
    finally {
      connection.release();
    }
  }

  public async getUserByUserName(username: string): Promise<User> {
    // TODO: implement filter functionality
    const connection = await this.dbService.getConnection();
    try {
      const [results] = await connection.query<RowDataPacket[]>(`SELECT * FROM user where username ='${username}' LIMIT 1;`);
      return DatabaseMapping.mapUser(results[0]);
    }
    finally {
      connection.release();
    }
  }

  public async updateUser(user: User): Promise<User> {
    const connection = await this.dbService.getConnection();
    try {
      await connection.query<RowDataPacket[]>(
        `UPDATE user SET name = '${user.name}', surname = '${user.surname}', username = '${user.username}', email = '${user.email}', password = '${user.password}', user_ref = '${user.userRef}', date_create = '${format(user.dateCreate, 'yyyy-MM-dd HH:mm:ss')}', date_change = '${format(user.dateChange, 'yyyy-MM-dd HH:mm:ss')}' WHERE user_id = '${user.userId}';`
      );

      return await this.getUserById(user.userId);
    }
    catch (err) {
      console.log(err);
      return {} as User;
    }
    finally {
      connection.release();
    }
  }

  public async addUser(user: User): Promise<User> {
    const connection = await this.dbService.getConnection();
    try {
      if (await this.getUserByUserName(user.username)) {
        console.log(`Cannot insert user, a user with the same username: '${user.username}' already exists! Please change it.`);
        return {} as User;
      }

      const addUser = await connection.execute(
        "INSERT INTO user (name, surname, username, email, password, user_ref, date_create, date_change) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [user.name, user.surname, user.username, user.email, user.password, user.userRef, user.dateCreate, user.dateChange]
      );
      const insertId = (addUser[0] as ResultSetHeader)?.insertId;
      return await this.getUserById(insertId);
    } catch (err) {
      console.log(err);
      return {} as User;
    }
    finally {
      connection.release();
    }
  }

  public async deleteUserById(userId: number): Promise<boolean> {
    const connection = await this.dbService.getConnection();
    try {
      const results: [ResultSetHeader, FieldPacket[]] = await connection.query<ResultSetHeader>(`DELETE FROM user WHERE user_id = ?`, [userId]);
      const affectedRows = results[0].affectedRows;
      return affectedRows > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
    finally {
      connection.release();
    }
  }


}
