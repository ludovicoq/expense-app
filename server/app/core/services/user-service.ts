import { RowDataPacket } from "mysql2";
import { User } from "../models/user";
import { DatabaseService } from "./db-service";
import { DatabaseMapping } from "./mapping-database";

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

  public async getUsersById(userId: number): Promise<User> {
    const connection = await this.dbService.getConnection();
    try {
      const [results] = await connection.query<RowDataPacket[]>('SELECT * FROM user where user_id =?;', [userId]);
      return DatabaseMapping.mapUser(results[0]);
    }
    finally {
      connection.release();
    }
  }

}
