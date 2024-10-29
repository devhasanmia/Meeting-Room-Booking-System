import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const initiatePayment = async (paymentData: any) => {
  const response = await axios.post("https://sandbox.aamarpay.com/jsonpost.php", {
    store_id: "aamarpaytest",
    signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
    tran_id: paymentData.tran_id,
    success_url: `meeting-room-booking-system-one.vercel.app/api/payment/confirmation?transactionId=${paymentData.tran_id}`,
    fail_url: "meeting-room-booking-system-one.vercel.app/api/payment/paymentFaild",
    cancel_url: "meeting-room-booking-system-one.vercel.app/api/payment/paymentFaild",
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
