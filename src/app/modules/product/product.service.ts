import { ProductModel } from "./product.model";
import { IProduct } from "./product.interface";

const createProductIntoDB = async (product: IProduct) => {
  // console.log(product);
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

//* ---------------- GET A SINGLE PRODUCT BY ID -----------------------------
const getProductByID = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

//* ---------------- UPDATE A SINGLE PRODUCT BY ID -----------------------------
const updateProductByID = async (
  productId: string,
  updatedData: Partial<IProduct>
) => {
  const result = await ProductModel.findByIdAndUpdate(productId, updatedData, {
    new: true,
  });
  return result;
};

//* ---------------- DELETE A SINGLE PRODUCT BY ID -----------------------------
const deleteProductByID = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByID,
  deleteProductByID,
  updateProductByID,
};
