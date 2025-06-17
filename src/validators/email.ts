import { MiddlewareOutput } from "../types.js";

const email = (value: string): MiddlewareOutput<string> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return {
      result: "not_accepted" as const,
      value,
      error: "Invalid email format",
      errorCode: "INVALID_EMAIL",
    };
  }
  return {
    result: "accepted" as const,
    value,
    error: undefined,
    errorCode: "NONE",
  };
};
export default email;
