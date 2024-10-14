import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// parser and middleware
app.use(express.json());
app.use(cors());

const getDbController = (req: Request, res: Response) => {
  res.send("Hello PH Team!");
};

app.get("/", getDbController);

export default app;

console.log(process.cwd());
