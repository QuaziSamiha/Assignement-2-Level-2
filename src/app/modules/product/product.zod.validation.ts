import { z } from "zod";

const productVariantSchemaZod = z.object({
  productVariantType: z.string({
    required_error: "Variant type is required",
    invalid_type_error: "Variant type must be string",
  }),
  productVariantValue: z.string({
    required_error: "Variant value is required",
    invalid_type_error: "Variant value must be string",
  }),
});

const productInventorySchemaZod = z.object({
  inventory: z.object({
    quantity: z
      .number({
        required_error: "Product inventory quantity is required",
        invalid_type_error: "Product inventory quantity must be a number",
      })
      .int()
      .min(0, "Quantity must be a non-negative integer"),
    inStock: z.boolean({
      required_error: "In-stock is required",
      invalid_type_error: "In-stock type must be boolean",
    }),
  }),
});

const productSchemaZod = z.object({
  productName: z.string({
    required_error: "Product name is required",
    invalid_type_error: "Product name is must be string",
  }),
  productDescription: z.string({
    required_error: "Product description is required",
    invalid_type_error: "Product description is must be string",
  }),
  productPrice: z
    .number({
      required_error: "Product price is required",
      invalid_type_error: "Product price is must be in digits",
    })
    .positive("Product price must be greater than 0"),
  productCategory: z.string({
    required_error: "Product category is required",
    invalid_type_error: "Product category is must be string",
  }),
  productTags: z.array(z.string()).nonempty("Product tags are required"),
  productVariants: z
    .array(productVariantSchemaZod)
    .nonempty("At least one variant is required"),
  productInventory: productInventorySchemaZod,
});

export default productSchemaZod;
