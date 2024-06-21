import { RowDataPacket } from "mysql2";
import { User } from "../models/user";

export class DatabaseMapping {

  /* ------------------------- U S E R ------------------------- */
  public static mapUsers(rowData: RowDataPacket[]): User[] {
    return rowData?.map(x => this.mapUser(x));
  }

  public static mapUser(rowData?: RowDataPacket): User {
    if (!rowData) {
      return undefined;
    }
    return {
      userId: rowData?.user_id,
      name: rowData?.name,
      dateChange: rowData?.date_change,
      dateCreate: rowData?.date_create,
      email: rowData?.email,
      password: rowData?.password,
      userRef: rowData?.user_ref,
      surname: rowData?.surname,
      username: rowData?.username,
    } as User;
  }
}
