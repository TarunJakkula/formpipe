import { MiddlewareOutput } from "../types.js";

const non_empty = (value: string): MiddlewareOutput<string> => {
  if (!value || value.length === 0) {
    return {
      result: "not_accepted" as const,
      value,
      error: "Value cannot be empty",
      errorCode: "NOT_EMPTY_REQUIRED",
    };
  }
  return {
    result: "accepted" as const,
    value,
    error: undefined,
    errorCode: "NONE",
  };
};

export default non_empty;
