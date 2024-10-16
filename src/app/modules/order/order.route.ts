import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post("/", OrderControllers.createOrder);
// http://localhost:3100/api/orders

export const OrderRoutes = router;
