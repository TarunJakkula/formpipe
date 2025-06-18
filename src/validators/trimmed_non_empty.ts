import { MiddlewareOutput, Validator } from "../types.js";

const trimmed_non_empty: Validator = (value: string): MiddlewareOutput => {
  const trimmed = value?.trim() || "";
  if (!trimmed || trimmed.length === 0) {
    return {
      result: "not_accepted",
      value: trimmed,
      error: "Value cannot be empty after trimming",
      errorCode: "TRIMMED_NOT_EMPTY_REQUIRED",
    };
  }
  return {
    result: "accepted",
    value: trimmed,
    errorCode: "NONE",
  };
};

export default trimmed_non_empty;
