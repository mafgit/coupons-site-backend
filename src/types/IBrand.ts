import { ICategory } from "./ICategory";
import { ICoupon } from "./ICoupon";

export interface IBrand {
  _id: string;
  name: string;
  category: ICategory;
  image: string;
  website: string;
  description: string;
  slug: string;
  coupons?: ICoupon[];
  view_count: number;
  rating?: number;
  rating_count?: number;
  order: number;
  more_about: string;
}
