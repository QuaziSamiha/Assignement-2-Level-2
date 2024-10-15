import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";

const app: Application = express();

// parser and middleware
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", ProductRoutes);

const getDbController = (req: Request, res: Response) => {
  res.send("Hello PH Team!");
};

app.get("/", getDbController);

export default app;

// console.log(process.cwd());
