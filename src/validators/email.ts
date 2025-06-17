import { MiddlewareOutput } from "../types.js";

const email = (value: string): MiddlewareOutput => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!isValid) {
    return {
      result: "not_accepted",
      value,
      error: "Invalid email",
      errorCode: "EMAIL_INVALID",
    };
  }
  return { result: "accepted", value, error: undefined, errorCode: "NONE" };
};
export default email;
