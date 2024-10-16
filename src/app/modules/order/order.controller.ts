import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderZodSchema from "./order.zod.validation";

//? ==================================== CREATE PRODUCT =========================================
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    console.log(orderData);
    const zodParsedData = orderZodSchema.parse(orderData); //! zod validation
    const result = await OrderServices.createOrderIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Order is created sam",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to place new order samiha",
      error,
    });
  }
};

export const OrderControllers = {
  createOrder,
};
