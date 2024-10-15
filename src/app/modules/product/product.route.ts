import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.createProduct);
// http://localhost:3100/api/products

router.get("/", ProductControllers.getAllProducts);
// http://localhost:3100/api/products

router.get("/:productId", ProductControllers.getAProduct);
// http://localhost:3100/api/products/670e7c5130f8992af8680e02

router.delete("/:productId", ProductControllers.deleteAProduct);

export const ProductRoutes = router;
