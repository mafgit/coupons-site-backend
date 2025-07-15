import { Router } from "express";
import {
  getAllBrands,
  getBrandBySlug,
  getBrandsForCategory,
  addBrand,
  editBrand,
  deleteBrand,
  getBrandById,
  rateBrand,
} from "../controllers/brand";
import { verifyLoggedIn } from "../middlewares/verifyLoggedIn";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = Router();


/**
 * @swagger
 * tags:
 *      name: [Brand]
 *      description: Brand management
 */

router.post("/add", verifyLoggedIn, verifyAdmin, addBrand);
// router.post('/reorder', verifyLoggedIn, verifyAdmin, reorderBrand)
router.put("/edit/:id", verifyLoggedIn, verifyAdmin, editBrand);
router.delete("/delete/:id", verifyLoggedIn, verifyAdmin, deleteBrand);


/**
 * @swagger
 * /api/brand/all:
 *      get:
 *          summary: Get all brands
 *          tags: [Brand]
 *          parameters:
 *           - in: query
 *             name: name
 *             schema:
 *               type: string
 *             required: false
 *           - in: query
 *             name: slug
 *             schema:
 *               type: string
 *             required: false
 *           - in: query
 *             name: _id
 *             schema:
 *               type: string
 *             required: false
 *           - in: query
 *             name: category
 *             schema:
 *               type: string
 *             required: false
 *          responses:
 *              200:
 *                  description: List of brands
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Brand'
 *      
 */
router.get("/all", getAllBrands);


router.get("/by-slug/:slug", getBrandBySlug);
router.get("/by-id/:id", getBrandById);
router.get("/for-category/:id", getBrandsForCategory);
router.post('/rate/:id', rateBrand)

export default router;
