import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    console.log(productData);
    const result = await ProductServices.createProductIntoDB(productData);
    res.status(200).json({
      success: true,
      message: "product is created samu",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ProductControllers = {
  createProduct,
};
