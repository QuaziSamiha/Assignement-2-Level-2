import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productSchemaZod from "./product.zod.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    console.log(productData);
    const zodParsedData = productSchemaZod.parse(productData);
    // const result = await ProductServices.createProductIntoDB(productData);
    const result = await ProductServices.createProductIntoDB(zodParsedData);
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
