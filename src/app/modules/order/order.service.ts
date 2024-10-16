import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";
import { ProductModel } from "../product/product.model";
//* ---------------- CREATE ORDER BY ID -----------------------------
const createOrderIntoDB = async (order: IOrder) => {
  // console.log("order", order);

	// ! GETTING PRODUCT DETAILS FROM ORDER
  const productId = order?.productId;
  const orderQuantity = order?.quantity;

  try {
    const product = await ProductModel.findById(productId); //! GETTING PRODUCT OF SPECIFIC ID

    // console.log("productQuantity", product?.productInventory?.inventory.quantity);

    console.log("inStock", product?.productInventory?.inventory.inStock);

    const productQuantity = product?.productInventory?.inventory.quantity;

    const inStock = product?.productInventory?.inventory.inStock;

    if (inStock === false) {
      throw new Error("Stock is not available");
    }

    if (productQuantity !== undefined && orderQuantity !== undefined) {
      if (productQuantity < orderQuantity) {
        throw new Error(
          `Insufficient stock. Available: ${productQuantity}, Requested: ${orderQuantity}`
        );
      }
      // Calculate the new product quantity after placing the order
      const newProductQuantity = productQuantity - orderQuantity;
      product.productInventory.inventory.quantity = newProductQuantity;

      if (newProductQuantity === 0) {
        product.productInventory.inventory.inStock = false;
        console.log("Product is now out of stock.");
      }

      // Save the updated product quantity in the database
      await product.save();

      console.log(
        `Updated product quantity. New quantity: ${newProductQuantity}`
      );
    } else {
      throw new Error("Invalid product or order quantity");
    }

    // return;

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    console.log(order);
    const result = await OrderModel.create(order);
    return result;
  } catch (error: unknown) {
    // Ensure the error is an instance of Error before accessing its properties
    if (error instanceof Error) {
      // Check for casting error
      if (error.name === "CastError") {
        throw new Error(`Product with id ${productId} not found`);
      }
      // Re-throw any other known errors
      throw new Error(error.message);
    } else {
      // Handle cases where error is not an instance of Error
      throw new Error("An unexpected error occurred.");
    }
  }
};

// * ---------------- CREATE ORDER BY ID -----------------------------
// const createOrderIntoDB = async (order: IOrder) => {
//   console.log(order);
//   const result = await OrderModel.create(order);
//   return result;
// };

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