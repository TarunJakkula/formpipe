import { ValidatorMap, MiddlewareOutput } from "./types.js";

export function createValidationMiddleware<
  ErrorCode extends string,
  V extends ValidatorMap<ErrorCode>
>(validators: V) {
  return (
    ...args: [...(keyof V)[], { value: string }]
  ): MiddlewareOutput<ErrorCode> => {
    const last = args[args.length - 1];

    if (typeof last !== "object" || !("value" in last)) {
      throw new Error("Last argument must be an object with a `value` key.");
    }

    const value = last.value;
    const steps = args.slice(0, -1) as (keyof V)[];

    let current = value;

    for (const key of steps) {
      const validator = validators[key];
      if (!validator) {
        console.error(`Available validators:`, Object.keys(validators));
        throw new Error(`Validator "${String(key)}" not found.`);
      }
      const result = validator(current);
      if (result.result === "not_accepted") return result;
      current = result.value;
    }

    return {
      result: "accepted",
      value: current,
      error: undefined,
      errorCode: "NONE" as ErrorCode,
    };
  };
}
