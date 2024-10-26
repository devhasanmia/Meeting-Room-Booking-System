import Booking from "../booking.model";

const confirmationService = async (transactionId: string) => {
  const result = await Booking.findOneAndUpdate(
    { transactionId },
    { payment: "Paid" },
    { new: true }
  );
  return result;
};

export const paymentServices = {
  confirmationService,
};
