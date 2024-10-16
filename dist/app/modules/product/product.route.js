"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post("/", product_controller_1.ProductControllers.createProduct);
// http://localhost:3100/api/products
// or
// http://localhost:3100/api/products?searchTerm=Audio
router.get("/", product_controller_1.ProductControllers.getAllProducts);
// http://localhost:3100/api/products
router.get("/:productId", product_controller_1.ProductControllers.getAProduct);
// http://localhost:3100/api/products/670e7c5130f8992af8680e02
router.put("/:productId", product_controller_1.ProductControllers.updateProduct);
// http://localhost:3100/api/products/670e7c5130f8992af8680e02
exports.ProductRoutes = router;
