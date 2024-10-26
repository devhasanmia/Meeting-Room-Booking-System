import { NextFunction, Request, Response } from "express";
import { paymentServices } from "./payment.service";

const confirmation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await paymentServices.confirmationService(
    req.query.transactionId as string
  );
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Success</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-blue-50 flex items-center justify-center h-screen">
      <div class="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 class="text-4xl font-bold text-green-700 mb-4">Payment Successful!</h1>
        <p class="text-gray-800 mb-4">Your payment has been received.</p>
        <p class="text-gray-800 mb-6">Your booking will be confirmed very soon thanks</p>
        <a href="http://localhost:5173/user/my-booking" class="inline-block bg-green-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-green-700 transition duration-200 transform hover:scale-105">Go to Dashboard</a>
      </div>
    </body>
    </html>
  `);
};
const paymentFaild = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Faild</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-red-50 flex items-center justify-center h-screen">
      <div class="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 class="text-4xl font-bold text-red-700 mb-4">Payment Faild!</h1>
        <p class="text-gray-800 mb-4">Your payment has been Faild Please Try again.</p>
        <a href="http://localhost:5173/user/my-booking" class="inline-block bg-green-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-green-700 transition duration-200 transform hover:scale-105">Go to Dashboard</a>
      </div>
    </body>
    </html>
  `);
};

export const paymentController = {
  confirmation,
  paymentFaild,
};
