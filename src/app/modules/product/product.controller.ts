import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productSchemaZod from "./product.zod.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    console.log(productData);
    const zodParsedData = productSchemaZod.parse(productData);
    const result = await ProductServices.createProductIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "product is created sam",
      data: result,
    });
  } catch (error) {
    console.log("There is problem to create new product samiha");
    console.log(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "All products retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log("There is error to get all products from db");
    console.log(error);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
};
