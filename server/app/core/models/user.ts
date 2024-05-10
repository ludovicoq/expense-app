import { ModelBase } from "./model_base";

export interface User extends ModelBase {
  userId: number;
  email: string;
  name: string;
  surname: string;
  username: string;
  password: string;
}
