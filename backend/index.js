import mongoose from "mongoose";
import cors from 'cors';
import express from "express";
import config from"./config.js";
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import bodyParser from 'body-parser';
import orderRoutes from './routes/orderRoute.js';



//database connection:

const DB_Connection_String = process.env.DATABASE_CONNECTION_STRING.replace(
    "<mongodb_user>",
    process.env.DATABASE_USERNAME
).replace(
    "<mongodb_password>",
    process.env.DATABASE_PASSWORD 
)

mongoose.set("strictQuery",false)
mongoose.connect(DB_Connection_String).then(con=> console.log("Database connection established....."))

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user",userRouter);
app.use("/productsDetails",productRouter);
app.use('/api/orders', orderRoutes);


const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`listening on ${port}...`))
