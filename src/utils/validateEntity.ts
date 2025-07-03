import { IBrand } from "../types/IBrand";
import { ICategory } from "../types/ICategory";
import { ICoupon } from "../types/ICoupon";

export const validateCoupon = (
  data: ICoupon
): { valid: boolean; error: string } => {
  return { valid: true, error: "" };
};

export const validateBrand = (
  data: IBrand
): { valid: boolean; error: string } => {
  return { valid: true, error: "" };
};

export const validateCategory = (
  data: ICategory
): { valid: boolean; error: string } => {
  return { valid: true, error: "" };
};
