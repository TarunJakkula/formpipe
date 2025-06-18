import { MiddlewareOutput, Validator } from "../types.js";

const non_empty: Validator = (value: string): MiddlewareOutput => {
  if (!value || value.length === 0) {
    return {
      result: "not_accepted",
      value,
      error: "Value cannot be empty",
      errorCode: "NOT_EMPTY_REQUIRED",
    };
  }
  return {
    result: "accepted",
    value,
    errorCode: "NONE",
  };
};

export default non_empty;
