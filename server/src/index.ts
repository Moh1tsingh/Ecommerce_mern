import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", UserRouter);
app.use("/product",productRouter)

mongoose.connect(
  "mongodb+srv://thakurmohitsingh2003:EcommercePassword@ecommerce.j7dceb5.mongodb.net/ecommerce"
);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
