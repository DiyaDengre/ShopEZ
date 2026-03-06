import express from "express";
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
.get(fetchProducts)
.post(authenticate, authorizeAdmin, addProduct);

router.get("/allProducts", fetchAllProducts);

router.get("/top", fetchTopProducts);

router.get("/new", fetchNewProducts);

router.post("/filtered-products", filterProducts);

router
.route("/:id")
.get(fetchProductById)
.put(authenticate, authorizeAdmin, updateProductDetails)
.delete(authenticate, authorizeAdmin, removeProduct);

router.post("/:id/reviews", authenticate, addProductReview);

export default router;