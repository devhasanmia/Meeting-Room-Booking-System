import { TErrorSource, TGenericErrorResponse } from "../interface/error";

// Use Regex
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMsg = match && match[1];
  const errorMessages: TErrorSource = [
    {
      path: "",
      message: `${extractedMsg} already exists`,
    },
  ];
  return {
    status: 400,
    message: "Duplicate Entry",
    errorMessages,
  };
};

export default handleDuplicateError;
