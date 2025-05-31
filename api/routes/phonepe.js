// backend/routes/phonepe.js

import express from "express";
import crypto from "crypto";
import axios from "axios";

const router = express.Router();

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'YOUR_MERCHANT_ID';
const MERCHANT_KEY = process.env.PHONEPE_MERCHANT_KEY || 'YOUR_SECRET_KEY';
const REDIRECT_URL = 'http://localhost:3000/payment/success';

const initiatePhonePePayment = async (req, res) => {
  const { amount, userEmail, orderId, name, address, contact, items } = req.body;

  if (!userEmail || !amount || !orderId || !name || !address || !contact || !items?.length) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const payload = {
      merchantId: MERCHANT_ID,
      transactionId: orderId,
      amount: amount * 100,
      merchantUserId: userEmail,
      redirectUrl: REDIRECT_URL,
      redirectMode: 'POST',
      callbackUrl: REDIRECT_URL,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');

    const checksum = crypto
      .createHash('sha256')
      .update(base64Payload + '/pg/v1/pay' + MERCHANT_KEY)
      .digest('hex');

    const headers = {
      'Content-Type': 'application/json',
      'X-VERIFY': `${checksum}###1`,
    };

    const response = await axios.post(
      'https://api.phonepe.com/apis/hermes/pg/v1/pay',
      { request: base64Payload },
      { headers }
    );

    if (response.data.success) {
      return res.json({
        success: true,
        redirectUrl: response.data.data.instrumentResponse.redirectInfo.url
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment initiation failed',
        data: response.data
      });
    }
  } catch (err) {
    console.error('PhonePe Payment Error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

router.post('/initiate-phonepe', initiatePhonePePayment);

export default router;
