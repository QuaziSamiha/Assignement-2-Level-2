"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderZodSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "User email is required",
        invalid_type_error: "Email must be string",
    }),
    productId: zod_1.z.string({
        required_error: "Product id is required",
        invalid_type_error: "Product id must be string",
    }),
    price: zod_1.z
        .number({
        required_error: "Product price is required",
        invalid_type_error: "Product price must be in digits",
    })
        .positive("Product price must be greater than 0"),
    quantity: zod_1.z
        .number({
        required_error: "Order quantity is required",
        invalid_type_error: "Quantity must be in digits",
    })
        .positive("Product quantity must be greater than 0"),
});
exports.default = orderZodSchema;
