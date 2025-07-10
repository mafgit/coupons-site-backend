import { IBrand } from "./IBrand";

export interface ICoupon {
  _id: string;
  title: string;
  code: string;
  brand: IBrand;
  price: number;
  terms_and_conditions: string;
  type: "code" | "deal";
  verified: boolean;
  view_count: number;
}
