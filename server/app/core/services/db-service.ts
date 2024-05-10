import mysql, { Pool, PoolConnection, PoolOptions } from "mysql2/promise";
import { AppConfiguration } from "../models/config";

export class DatabaseService {
  private pool: Pool;
  private config: PoolOptions;
  constructor() {
    this.config = AppConfiguration.Configuration;
    this.pool = mysql.createPool({
      host: this.config.host,
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  public async getConnection(): Promise<PoolConnection> {
    return this.pool.getConnection();
  }
}

