import { Request, Response } from "express";
import Coupon from "../models/Coupon";
import { ICoupon } from "../types/ICoupon";
import { validateCoupon } from "../utils/validateEntity";
import mongoose from "mongoose";
import Brand from "../models/Brand";
import View from "../models/View";

export const getCouponsForBrand = (req: Request, res: Response) => {
  Coupon.find({ brand: req.params.id })
    .sort({ order: 1 })
    .populate("brand")
    .then((coupons) => {
      return res.json({ coupons });
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
};

export const viewCouponById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Invalid ID passed");

    const coupon = await Coupon.findById(
      new mongoose.Types.ObjectId(id)
    ).populate("brand");

    if (coupon) {
      try {
        await View.create({
          ip: req.ip,
          couponId: id,
        });

        // await coupon.updateOne({
        //   view_count: coupon.view_count + 1,
        // });
        // res.json({ coupon: { ...coupon, view_count: coupon.view_count + 1 } });
        // return;
        const updatedCoupon = await Coupon.findOneAndUpdate(
          {
            _id: coupon._id,
          },
          {
            $inc: { view_count: 1 },
          },
          { new: true }
        ).populate("brand");

        res.json({ coupon: updatedCoupon });
      } catch (err) {
        console.log("Already viewed, not adding a view");
      }
    }

    res.json({ coupon });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const getCouponById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Invalid ID passed");

    const coupon = await Coupon.findById(
      new mongoose.Types.ObjectId(id)
    ).populate("brand");

    if (!coupon) {
      throw new Error("Coupon not found");
    }

    res.json({ coupon });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const searchOffers = async (req: Request, res: Response) => {
  try {
    let q = req.query.q as string;
    // if (!q) {
    // throw new Error("Query is required");
    // }
    q = q.trim();
    const offers = await Coupon.aggregate([
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      { $unwind: "$brand" },
      {
        $match: {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { "brand.name": { $regex: q, $options: "i" } },
          ],
        },
      },
      {
        $limit: 8,
      },
    ]);

    const brands = await Brand.aggregate([
      {
        $lookup: {
          from: "coupons",
          localField: "_id",
          foreignField: "brand",
          as: "coupons",
        },
      },
      {
        $match: {
          name: { $regex: q, $options: "i" },
        },
      },
      {
        $addFields: {
          couponCount: { $size: "$coupons" },
        },
      },
      {
        $project: {
          coupons: 0,
        },
      },
      { $limit: 5 },
    ]);
    // const promises = [
    //   Coupon.find()
    //     .populate("brand")
    //     .find({
    //       title: { $regex: q, $options: "i" },
    //     })
    //     .limit(8),
    //   Brand.find({
    //     name: { $regex: q, $options: "i" },
    //   }).limit(5),
    // ];
    // const [offers, brands] = await Promise.all(promises);

    res.json({ offers, brands });
  } catch (error) {
    console.log(error);

    res.status(400).json({ error });
  }
};

export const getAllCoupons = async (
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
    if (req.query.title)
      query["title"] = { $regex: req.query.title, $options: "i" };
    if (req.query.code)
      query["code"] = { $regex: req.query.code, $options: "i" };
    if (req.query.type) query["type"] = req.query.type;
    if (req.query.verified) query["verified"] = { $eq: req.query.verified };
    if (req.query.code)
      query["code"] = { $regex: req.query.code, $options: "i" };
    if (req.query.price)
      query["price"] = { $eq: parseFloat(req.query.price as string) };
    if (
      req.query.brand &&
      mongoose.Types.ObjectId.isValid(req.query.brand as string)
    )
      query["brand"] = new mongoose.Types.ObjectId(req.query.brand as string);

    console.log(query);

    let coupons = await Coupon.find(query)
      .sort({ order: 1 })
      .populate("brand");
    // if (req.query.brand) {
    //   coupons = coupons.filter(
    //     (coupon) => (coupon.brand as any).name === (req.query.brand as string)
    //   );
    // }
    res.json({ coupons });
  } catch (err) {
    res.status(400).json({ err, coupons: [] });
  }
};

export const addCoupon = async (req: Request, res: Response) => {
  try {
    const data: ICoupon = req.body;

    const { valid, error } = validateCoupon(data);
    if (!valid) {
      res.json({ success: false, error });
      return;
    }

    await Coupon.create(data);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const editCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
    const { valid, error } = validateCoupon(req.body);
    if (valid) {
      const coupon = await Coupon.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: req.body }
      );
      res.json({ coupon, success: true });
    } else {
      res.json({ success: false, error });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const deleteCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
    await Coupon.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const reorderCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ids = JSON.parse(req.body.new_orders);
    const bulk = ids.map((id: string, i: number) => {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Id");
      return {
        updateOne: {
          filter: {
            _id: new mongoose.Types.ObjectId(id),
          },
          update: {
            $set: {
              order: (i + 1) * 100,
            },
          },
        },
      };
    });

    console.log(bulk);

    await Coupon.bulkWrite(bulk);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
  // try {
  //   if (!mongoose.Types.ObjectId.isValid(req.body.draggedId))
  //     throw new Error("Invalid Id");

  //   await Coupon.updateOne(
  //     { _id: new mongoose.Types.ObjectId(req.body.draggedId) },
  //     {
  //       $set: {
  //         order: parseFloat(req.body.new_order as string),
  //       },
  //     }
  //   );
  //   res.json({ success: true });
  // } catch (err) {
  //   res.status(400).json({ success: false, error: err });
  // }
};
