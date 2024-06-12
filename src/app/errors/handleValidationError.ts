import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
  const errorMessages: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    status: 400,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleValidationError;
