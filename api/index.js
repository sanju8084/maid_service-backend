import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import authRoutes from './routes/auth_route.js'
import  bodyParser from "body-parser";
import cors from "cors";
import cartRoutes from "./routes/cart_route.js";
import orderRoutes from "./routes/order_route.js"
import phonepeRoutes from "./routes/phonepe.js"

dotenv.config();
connectDB();

const app=express();
app.use(express.json())
const port=process.env.PORT ||5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth',authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/phonepe', phonepeRoutes);

app.listen(3000,()=>{
    console.log(`server run on port ${3000}`)
})
