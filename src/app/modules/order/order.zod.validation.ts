import { z } from "zod";

const orderZodSchema = z.object({
  email: z.string({
    required_error: "User email is required",
    invalid_type_error: "Email must be string",
  }),
  productId: z.string({
    required_error: "Product id is required",
    invalid_type_error: "Product id must be string",
  }),
  price: z
    .number({
      required_error: "Product price is required",
      invalid_type_error: "Product price must be in digits",
    })
    .positive("Product price must be greater than 0"),
  quantity: z
    .number({
      required_error: "Order quantity is required",
      invalid_type_error: "Quantity must be in digits",
    })
    .positive("Product quantity must be greater than 0"),
});

export default orderZodSchema;
