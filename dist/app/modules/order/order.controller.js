"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_zod_validation_1 = __importDefault(require("./order.zod.validation"));
//? ==================================== CREATE ORDER =========================================
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("create order", req.body);
    try {
        const orderData = req.body;
        // console.log(orderData);
        const zodParsedData = order_zod_validation_1.default.parse(orderData); //! zod validation 
        console.log("zodParsedData", zodParsedData);
        const result = yield order_service_1.OrderServices.createOrderIntoDB(zodParsedData);
        // console.log("result", result);
        res.status(200).json({
            success: true,
            message: "Order is created sam",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Error to place new order samiha",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "An unexpected error occurred",
                error: String(error),
            });
        }
    }
});
//? ================ GET ALL ORDER or GET ORDERS FOR SPECIFIC EMAIL USER =========================================
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        if (!email) {
            // ! GET ALL ORDER OF ALL EMAIL USER
            const result = yield order_service_1.OrderServices.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "All orders retrieved successfully",
                data: result,
            });
        }
        else {
            //! GET ORDERS BY SPECIFIED EMAIL USER
            const result = yield order_service_1.OrderServices.getOrdersByEmail(email);
            res.status(200).json({
                success: true,
                message: `Orders fetched successfully for user email ${email}!`,
                data: result,
            });
        }
    }
    catch (error) {
        const { email } = req.query;
        if (!email) {
            res.status(500).json({
                success: false,
                message: "Something went wrong to get all order",
                error: error,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong while fetching orders by email",
                error,
            });
        }
    }
});
//? =============================== GET ALL ORDER  =========================================
// const getAllOrders = async (req: Request, res: Response) => {
//   try {
//     const result = await OrderServices.getAllOrdersFromDB();
//     res.status(200).json({
//       success: true,
//       message: "All orders retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong to get all order",
//       error: error,
//     });
//   }
// };
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
