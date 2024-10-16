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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_zod_validation_1 = __importDefault(require("./product.zod.validation"));
//? ==================================== CREATE PRODUCT =========================================
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // console.log(productData);
        const zodParsedData = product_zod_validation_1.default.parse(productData); //! zod validation
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "product is created sam",
            data: result,
        });
    }
    catch (error) {
        console.log("There is problem to create new product samiha");
        console.log(error);
    }
});
//? ==================================== GET ALL PRODUCT =========================================
// const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const result = await ProductServices.getAllProductsFromDB();
//     res.status(200).json({
//       success: true,
//       message: "All products retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong to get all product",
//       error: error,
//     });
//   }
// };
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getAllProductsFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error,
        });
    }
});
//? ==================================== GET A PRODUCT =========================================
const getAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // console.log(productId);
        const result = yield product_service_1.ProductServices.getProductByID(productId);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "A product is fetched",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong to get a product",
            error: error,
        });
    }
});
//? ==================================== UPDATE PRODUCT =========================================
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedProductData = req.body;
        const zodParsedData = product_zod_validation_1.default.partial().parse(updatedProductData); //! validate partial update data using zod
        const result = yield product_service_1.ProductServices.updateProductByID(productId, zodParsedData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "There was an error updating the product",
            error: error,
        });
    }
});
//? ==================================== DELETE PRODUCT =========================================
const deleteAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProductByID(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: result,
        });
    }
    catch (error) {
        console.log("There was an error deleting the product");
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getAProduct,
    updateProduct,
    deleteAProduct,
};
