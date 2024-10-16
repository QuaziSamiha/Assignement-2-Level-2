import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";

//* ---------------- CREATE ORDER BY ID -----------------------------
const createOrderIntoDB = async (order: IOrder) => {
  console.log(order);
  const result = await OrderModel.create(order);
  return result;
};

//* ---------------- GET ALL ORDERS FROM DB -----------------------------
const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

//* ---------------- GET ORDERS BY EMAIL FROM DB -----------------------------
const getOrdersByEmail = async (email: string) => {
  const result = await OrderModel.find({ email }); // Find orders with the specified email
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmail,
};
