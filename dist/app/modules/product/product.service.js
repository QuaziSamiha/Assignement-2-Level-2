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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
//* ---------------- CREATE PRODUCT BY ID -----------------------------
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(product);
    const result = yield product_model_1.ProductModel.create(product);
    return result;
});
//* ---------------- GET ALL PRODUCTS FROM DB -----------------------------
// const getAllProductsFromDB = async () => {
//   const result = await ProductModel.find();
//   return result;
// };
//* ---------------- GET ALL PRODUCTS FROM DB AND SEARCH PRODUCT BY KEY WORD -----------------------------
const getAllProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (searchTerm) {
        query = {
            $or: [
                { productName: { $regex: searchTerm, $options: "i" } },
                { productDescription: { $regex: searchTerm, $options: "i" } },
                { productCategory: { $regex: searchTerm, $options: "i" } },
                { productTags: { $regex: searchTerm, $options: "i" } },
            ],
        };
    }
    const result = yield product_model_1.ProductModel.find(query);
    return result;
});
//* ---------------- GET A SINGLE PRODUCT BY ID -----------------------------
const getProductByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ _id: id });
    return result;
});
//* ---------------- UPDATE A SINGLE PRODUCT BY ID -----------------------------
const updateProductByID = (productId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(productId, updatedData, {
        new: true,
    });
    return result;
});
//* ---------------- DELETE A SINGLE PRODUCT BY ID -----------------------------
const deleteProductByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndDelete({ _id: id });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductByID,
    deleteProductByID,
    updateProductByID,
};
