import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";
  let errorMessages: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  if (err.status) {
    status = err.status;
  }

  res.status(status).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
