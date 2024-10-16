import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";

//* ---------------- CRETE PRODUCT BY ID -----------------------------
const createOrderIntoDB = async (order: IOrder) => {
  console.log(order);
  const result = await OrderModel.create(order);
  return result;
};

//* ---------------- GET ALL PRODUCTS FROM DB -----------------------------
const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
