import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("MongoDB connected successfully samiha");
    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Mongodb connection error");
    console.log(error);
  }
}

main();
