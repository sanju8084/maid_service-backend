import express from "express";
import CartModel from "../models/Cart.js";
const router = express.Router();

router.post('/saveCart', async (req, res) => {
  const { email, cartItems } = req.body;
  try {
    const userCart = await CartModel.findOneAndUpdate(
      { email },
      { cart: cartItems },
      { new: true, upsert: true }  // upsert ensures creation if not exists
    );
    res.json({ success: true, message: 'Cart saved', cart: userCart.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save cart', error });
  }
});

router.get('/getCart/:email', async (req, res) => {
  try {
    const user = await CartModel.findOne({ email: req.params.email });
    if (!user) return res.json({ success: true, cart: [] });
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch cart', error });
  }
});

export default router;
