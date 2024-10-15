import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  email: {
    type: String,
    required: [true, "User email is required"],
  },
  productId: {
    type: String,
    required: [true, "Product id is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  quantity: { type: Number, required: [true, "Quantity is required"] },
});

export const OrderModel = model<IOrder>("Order", orderSchema);
