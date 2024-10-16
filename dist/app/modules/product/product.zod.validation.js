"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productVariantSchemaZod = zod_1.z.object({
    productVariantType: zod_1.z.string({
        required_error: "Variant type is required",
        invalid_type_error: "Variant type must be string",
    }),
    productVariantValue: zod_1.z.string({
        required_error: "Variant value is required",
        invalid_type_error: "Variant value must be string",
    }),
});
const productInventorySchemaZod = zod_1.z.object({
    inventory: zod_1.z.object({
        quantity: zod_1.z
            .number({
            required_error: "Product inventory quantity is required",
            invalid_type_error: "Product inventory quantity must be a number",
        })
            .int()
            .min(0, "Quantity must be a non-negative integer"),
        inStock: zod_1.z.boolean({
            required_error: "In-stock is required",
            invalid_type_error: "In-stock type must be boolean",
        }),
    }),
});
const productSchemaZod = zod_1.z.object({
    productName: zod_1.z.string({
        required_error: "Product name is required",
        invalid_type_error: "Product name must be string",
    }),
    productDescription: zod_1.z.string({
        required_error: "Product description is required",
        invalid_type_error: "Product description is must be string",
    }),
    productPrice: zod_1.z
        .number({
        required_error: "Product price is required",
        invalid_type_error: "Product price is must be in digits",
    })
        .positive("Product price must be greater than 0"),
    productCategory: zod_1.z.string({
        required_error: "Product category is required",
        invalid_type_error: "Product category is must be string",
    }),
    productTags: zod_1.z.array(zod_1.z.string()).nonempty("Product tags are required"),
    productVariants: zod_1.z
        .array(productVariantSchemaZod)
        .nonempty("At least one variant is required"),
    productInventory: productInventorySchemaZod,
});
exports.default = productSchemaZod;
