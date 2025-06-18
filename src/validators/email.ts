import { MiddlewareOutput, Validator } from "../types.js";

const email: Validator = (value: string): MiddlewareOutput => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return {
      result: "not_accepted",
      value,
      error: "Invalid email format",
      errorCode: "INVALID_EMAIL",
    };
  }
  return {
    result: "accepted",
    value,
    errorCode: "NONE",
  };
};
export default email;
