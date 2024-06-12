import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorMessages: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    status: 400,
    message: "Invalid Id",
    errorMessages,
  };
};

export default handleCastError;
