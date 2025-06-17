import { MiddlewareOutput } from "../types.js";

const trimmed_non_empty = (value: string): MiddlewareOutput => {
  const trimmed = value.trim();
  if (!trimmed) {
    return {
      result: "not_accepted",
      value: trimmed,
      error: "Cannot be empty",
      errorCode: "EMPTY",
    };
  }
  return {
    result: "accepted",
    value: trimmed,
    error: undefined,
    errorCode: "NONE",
  };
};

export default trimmed_non_empty;
