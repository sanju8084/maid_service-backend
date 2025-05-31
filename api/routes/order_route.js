import express from "express";
import OrderModel from "../models/Order.js";
const router = express.Router();
router.post('/placeOrder', async (req, res) => {
    try {
      const order = new OrderModel(req.body);
      await order.save();
      res.status(200).json({ success: true, message: "Order saved to MongoDB" });
    } catch (err) {
      console.error("Error saving order:", err);
      res.status(500).json({ success: false, message: "Failed to save order" });
    }
  });

  router.get('/history/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const orders = await OrderModel.find({ userEmail: email }).sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ success: false, message: "Failed to fetch order history" });
  }
});

export default router;
