 import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
     userEmail: String,
     name: String,
    address: String,
     contact: String,
     items: Array,
    date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' } 
   });
 const OrderModel = mongoose.model('Order', orderSchema);
 export default OrderModel;
