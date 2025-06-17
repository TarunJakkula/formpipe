import { MiddlewareOutput } from "../types.js";

const trimmed_non_empty = (value: string): MiddlewareOutput<string> => {
  const trimmed = value?.trim() || "";
  if (!trimmed || trimmed.length === 0) {
    return {
      result: "not_accepted" as const,
      value: trimmed,
      error: "Value cannot be empty after trimming",
      errorCode: "TRIMMED_NOT_EMPTY_REQUIRED",
    };
  }
  return {
    result: "accepted" as const,
    value: trimmed,
    error: undefined,
    errorCode: "NONE",
  };
};

export default trimmed_non_empty;
