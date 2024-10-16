import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post("/", OrderControllers.createOrder);
// http://localhost:3100/api/orders

//! ROUTE TO GET ALL ORDERS OR GET ORDERS OF A SPECIFIC EMAIL USER
router.get("/", OrderControllers.getAllOrders);
// http://localhost:3100/api/orders
// http://localhost:3100/api/orders?email=jane.smith@example.com

export const OrderRoutes = router;
