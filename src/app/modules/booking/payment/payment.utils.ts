import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const initiatePayment = async (paymentData: any) => {
  const response = await axios.post(process.env.PAYMENT_URL!, {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    tran_id: paymentData.tran_id,
    success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.tran_id}`,
    fail_url: "http://localhost:5000/api/payment/paymentFaild",
    cancel_url: "http://localhost:5000/api/payment/paymentFaild",
    amount: paymentData.amount,
    currency: "BDT",
    desc: "Meeting Room Payment",
    cus_name: "Name",
    cus_email: "payer@merchantcusomter.com",
    cus_add1: "House B-158 Road 22",
    cus_add2: "Mohakhali DOHS",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1206",
    cus_country: "Bangladesh",
    cus_phone: "+8801704",
    type: "json",
  });
  return response.data;
};
