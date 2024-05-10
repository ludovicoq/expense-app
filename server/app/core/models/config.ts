import { PoolOptions } from "mysql2";

export class AppConfiguration {
  private static readonly config: PoolOptions = AppConfiguration.getConfig();

  private static getConfig(): PoolOptions {
    var pippo = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };
    if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_DATABASE) {
      throw new Error(`Missing required environment variables User: ${process.env.DB_USER}, Password: ${process.env.DB_PASSWORD}, Host: ${process.env.DB_HOST}, Database: ${process.env.DB_DATABASE}`);
    }
    return pippo;
  }

  public static get Configuration(): PoolOptions {
    return this.config;
  }
}
