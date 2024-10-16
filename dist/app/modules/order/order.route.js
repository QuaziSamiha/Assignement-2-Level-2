"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/", order_controller_1.OrderControllers.createOrder);
// http://localhost:3100/api/orders
//! ROUTE TO GET ALL ORDERS OR GET ORDERS OF A SPECIFIC EMAIL USER
router.get("/", order_controller_1.OrderControllers.getAllOrders);
// http://localhost:3100/api/orders
// http://localhost:3100/api/orders?email=jane.smith@example.com
exports.OrderRoutes = router;
