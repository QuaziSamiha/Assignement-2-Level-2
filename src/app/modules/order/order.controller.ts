import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderZodSchema from "./order.zod.validation";

//? ==================================== CREATE ORDER =========================================
const createOrder = async (req: Request, res: Response) => {
  // console.log("create order", req.body);
  try {
    const orderData = req.body;
    // console.log(orderData);
    const zodParsedData = orderZodSchema.parse(orderData); //! zod validation 
    console.log("zodParsedData", zodParsedData);

    const result = await OrderServices.createOrderIntoDB(zodParsedData);
    // console.log("result", result);
    res.status(200).json({
      success: true,
      message: "Order is created sam",
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Error to place new order samiha",
        error: error.message, 
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred",
        error: String(error), 
      });
    }
  }
};

//? ================ GET ALL ORDER or GET ORDERS FOR SPECIFIC EMAIL USER =========================================
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email) {
			// ! GET ALL ORDER OF ALL EMAIL USER
      const result = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: "All orders retrieved successfully",
        data: result,
      });
    } else {
			//! GET ORDERS BY SPECIFIED EMAIL USER
      const result = await OrderServices.getOrdersByEmail(email as string);
      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for user email ${email}!`,
        data: result,
      });
    }
  } catch (error) {
    const { email } = req.query;
    if (!email) {
      res.status(500).json({
        success: false,
        message: "Something went wrong to get all order",
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching orders by email",
        error,
      });
    }
  }
};

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

export const OrderControllers = {
  createOrder,
  getAllOrders,
};