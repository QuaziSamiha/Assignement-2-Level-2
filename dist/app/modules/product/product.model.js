"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productVariantSchema = new mongoose_1.Schema({
    productVariantType: { type: String, required: true },
    productVariantValue: { type: String, required: true },
});
const productInventorySchema = new mongoose_1.Schema({
    inventory: {
        quantity: { type: Number, required: true },
        inStock: { type: Boolean, required: true },
    },
});
const productSchema = new mongoose_1.Schema({
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
// Creating Mongoose model for product
exports.ProductModel = (0, mongoose_1.model)("Product", productSchema);
