import { model, Schema } from "mongoose";
import {
  IProduct,
  IProductInventory,
  IProductVariant,
} from "./product.interface";

const productVariantSchema = new Schema<IProductVariant>({
  productVariantType: { type: String, required: true },
  productVariantValue: { type: String, required: true },
});

const productInventorySchema = new Schema<IProductInventory>({
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
});

const productSchema = new Schema<IProduct>({
  productName: {
    type: String,
    required: [true, "product name is required samiha"],
  },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productCategory: { type: String, required: true },
  productTags: { type: [String], required: true },
  productVariants: { type: [productVariantSchema], required: true },
  productInventory: { type: productInventorySchema, required: true },
});

// Create Mongoose model
export const ProductModel = model<IProduct>("Product", productSchema);
