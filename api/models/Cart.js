import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  cart: { type: Array, default: [] }
});

const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;
