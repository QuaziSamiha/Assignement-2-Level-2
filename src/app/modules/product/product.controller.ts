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
    // console.log("There is error to get all products from db");
    // console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const result = await ProductServices.getProductByID(productId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "A product is fetched",
      data: result,
    });
  } catch (error) {
    // console.log("product retrieved base on id failed");
    // console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const deleteAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductByID(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log("There was an error deleting the product");
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getAProduct,
  deleteAProduct,
};
