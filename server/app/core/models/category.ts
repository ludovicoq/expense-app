import { ModelBase } from "./model_base";

export interface Category extends ModelBase {
  categoryId: number;
  code: string;
  description: string;
}
