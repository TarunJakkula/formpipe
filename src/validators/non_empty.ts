import { MiddlewareOutput } from "../types";

const non_empty = (value: string): MiddlewareOutput => {
  if (!value || value.trim() === "") {
    return {
      result: "not_accepted",
      value,
      error: "Field is required",
      errorCode: "EMPTY",
    };
  }
  return { result: "accepted", value, error: undefined, errorCode: "NONE" };
};

export default non_empty;
