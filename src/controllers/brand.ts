import { Request, Response } from "express";
import Brand from "../models/Brand";
import Coupon from "../models/Coupon";
import { IBrand } from "../types/IBrand";
import { validateBrand } from "../utils/validateEntity";
import mongoose from "mongoose";
import Rating from "../models/Rating";

export const getAllBrands = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query: { [key: string]: any } = {};
    if (
      req.query._id &&
      mongoose.Types.ObjectId.isValid(req.query._id as string)
    )
      query["_id"] = new mongoose.Types.ObjectId(req.query._id as string);
    if (req.query.name)
      query["name"] = { $regex: req.query.name, $options: "i" };
    if (req.query.slug)
      query["slug"] = { $regex: req.query.slug, $options: "i" };
    if (
      req.query.category &&
      mongoose.Types.ObjectId.isValid(req.query.category as string)
    ) {
      query["category"] = new mongoose.Types.ObjectId(
        req.query.category as string
      );
    }

    let brands = await Brand.find(query).populate("category");
    res.json({ brands });
  } catch (err) {
    res.status(400).json({ err, brands: [] });
  }
};

export const getBrandsForCategory = (req: Request, res: Response): void => {
  Brand.find({ category: req.params.id })
    .populate("category")
    .then((brands) => {
      res.json({ brands });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

export const getBrandBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;
    // const brand = await Brand.findOne({ slug }).populate("category");
    const brands = await Brand.aggregate([
      { $match: { slug: slug } },
      {
        $lookup: {
          from: "categories",
          foreignField: "_id",
          localField: "category",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "coupons",
          localField: "_id",
          foreignField: "brand",
          as: "coupons",
        },
      },
      {
        $set: {
          coupons: {
            $sortArray: {
              input: "$coupons",
              sortBy: { order: 1 },
            },
          },
        },
      },
      {
        $lookup: {
          from: "ratings",
          foreignField: "brandId",
          localField: "_id",
          as: "ratings",
        },
      },
      {
        $addFields: {
          view_count: {
            $sum: "$coupons.view_count",
          },
          rating: {
            $avg: "$ratings.number",
          },
          rating_count: {
            $size: "$ratings",
          },
        },
      },
      {
        $project: {
          ratings: 0,
        },
      },
    ]);

    if (brands.length === 0) throw new Error("Error");
    const brand = brands[0];
    const rating = await Rating.findOne({ brandId: brand._id, ip: req.ip });
    res.json({ brand, your_rating: rating?.number ?? 0 });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const getBrandById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id).populate("category");
    res.json({ brand });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const addBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: IBrand = req.body;

    const { valid, error } = validateBrand(data);
    if (!valid) {
      res.json({ success: false, error });
      return;
    }

    const largest = await Brand.find({}).sort({ order: -1 }).limit(1);
    let order = 100;
    if (largest && largest.length > 0) order = largest[0].order + 100;

    await Brand.create({ ...data, order });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const editBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
    const { valid, error } = validateBrand(req.body);
    if (valid) {
      const brand = await Brand.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: req.body }
      );
      res.json({ brand, success: true });
    } else {
      res.json({ success: false, error });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const deleteBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
    await Brand.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const rateBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const rating = parseInt(req.body.rating as string);
    const _id = req.params.id;

    if (rating < 1 || rating > 5) throw new Error("Invalid rating");
    if (!mongoose.Types.ObjectId.isValid(_id)) throw new Error("Invalid Id");

    await Rating.findOneAndUpdate(
      { brandId: new mongoose.Types.ObjectId(_id), ip: req.ip },
      {
        number: rating,
      },
      {
        upsert: true,
        // new: true,
      }
    );
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err });
  }
};
