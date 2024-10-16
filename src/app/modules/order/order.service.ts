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
		// console.log("inStock", product?.productInventory?.inventory.inStock);

		const productQuantity = product?.productInventory?.inventory.quantity; //! GETTING CURRENT PRODUCT QUANTITY

		const inStock = product?.productInventory?.inventory.inStock; //! GETTING CURRENT INSTOCK STATE

		// * -------------------- BONUS TASK --------------------
		// *========== IF PRODUCT IS NOT AVAILABLE IN STOCK ===========
		if (inStock === false) {
			throw new Error("Stock is not available");
		}

		// * -------------- IF ORDER QUANTITY IS GREATER THAN AVAILABE INVENTORY QUANTITY -------------
		if (productQuantity !== undefined && orderQuantity !== undefined) {
			if (productQuantity < orderQuantity) {
				throw new Error(
					`Insufficient stock. Available: ${productQuantity}, Requested: ${orderQuantity}`
				);
			}
			//! Calculate the new product quantity after placing the order
			const newProductQuantity = productQuantity - orderQuantity;
			product.productInventory.inventory.quantity = newProductQuantity;

			//! IF CURRENT PRODUCT QUANTITY IS 0, THEN MAKE INSTOCK FALSE
			if (newProductQuantity === 0) {
				product.productInventory.inventory.inStock = false;
				console.log("Product is now out of stock.");
			}

			//* Save the updated product quantity in the database
			await product.save();

			console.log(
				`Updated product quantity. New quantity: ${newProductQuantity}`
			);
		} else {
			throw new Error("Invalid product or order quantity");
		}

		// ! IF PRODUCT ID OF ORDER IS NOT PRESENT IN PRODUCT COLLECTION
		if (!product) {
			throw new Error(`Product with id ${productId} not found`);
		}

		// console.log(order);
		// ! ========== POST NEW ORDER =====================
		const result = await OrderModel.create(order);
		return result;
	} catch (error: unknown) {
			if (error instanceof Error) {
			// ! ERROR HANDLED
			if (error.name === "CastError") {
				throw new Error(`Product with id ${productId} not found`);
			}
				throw new Error(error.message);
		} else {
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
