"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
const product_model_1 = require("../product/product.model");
//* ---------------- CREATE ORDER BY ID -----------------------------
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("order", order);
    var _a, _b;
    // ! GETTING PRODUCT DETAILS FROM ORDER
    const productId = order === null || order === void 0 ? void 0 : order.productId;
    const orderQuantity = order === null || order === void 0 ? void 0 : order.quantity;
    try {
        const product = yield product_model_1.ProductModel.findById(productId); //! GETTING PRODUCT OF SPECIFIC ID
        // console.log("productQuantity", product?.productInventory?.inventory.quantity);
        // console.log("inStock", product?.productInventory?.inventory.inStock);
        const productQuantity = (_a = product === null || product === void 0 ? void 0 : product.productInventory) === null || _a === void 0 ? void 0 : _a.inventory.quantity; //! GETTING CURRENT PRODUCT QUANTITY
        const inStock = (_b = product === null || product === void 0 ? void 0 : product.productInventory) === null || _b === void 0 ? void 0 : _b.inventory.inStock; //! GETTING CURRENT INSTOCK STATE
        // * -------------------- BONUS TASK --------------------
        // *========== IF PRODUCT IS NOT AVAILABLE IN STOCK ===========
        if (inStock === false) {
            throw new Error("Stock is not available");
        }
        // * -------------- IF ORDER QUANTITY IS GREATER THAN AVAILABE INVENTORY QUANTITY -------------
        if (productQuantity !== undefined && orderQuantity !== undefined) {
            if (productQuantity < orderQuantity) {
                throw new Error(`Insufficient stock. Available: ${productQuantity}, Requested: ${orderQuantity}`);
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
            yield product.save();
            console.log(`Updated product quantity. New quantity: ${newProductQuantity}`);
        }
        else {
            throw new Error("Invalid product or order quantity");
        }
        // ! IF PRODUCT ID OF ORDER IS NOT PRESENT IN PRODUCT COLLECTION
        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }
        // console.log(order);
        // ! ========== POST NEW ORDER =====================
        const result = yield order_model_1.OrderModel.create(order);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            // ! ERROR HANDLED
            if (error.name === "CastError") {
                throw new Error(`Product with id ${productId} not found`);
            }
            throw new Error(error.message);
        }
        else {
            throw new Error("An unexpected error occurred.");
        }
    }
});
// * ---------------- CREATE ORDER BY ID -----------------------------
// const createOrderIntoDB = async (order: IOrder) => {
//   console.log(order);
//   const result = await OrderModel.create(order);
//   return result;
// };
//* ---------------- GET ALL ORDERS FROM DB -----------------------------
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find();
    return result;
});
//* ---------------- GET ORDERS BY EMAIL FROM DB -----------------------------
const getOrdersByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find({ email }); // Find orders with the specified email
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getOrdersByEmail,
};
