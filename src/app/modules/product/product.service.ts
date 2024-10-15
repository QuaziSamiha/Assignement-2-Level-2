import { ProductModel } from "./product.model";
import { IProduct } from "./product.interface";

const createProductIntoDB = async (product: IProduct) => {
  console.log(product);
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};
