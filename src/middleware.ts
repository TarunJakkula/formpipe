import { MiddlewareOutput, ValidatorMap } from "./types.js";
import { CoreValidators } from "./validators/core.js";

export function createValidationMiddleware<T extends ValidatorMap>(
  validators: T
) {
  return ({
    steps,
    value,
  }: {
    value: string;
    steps: (keyof T)[];
  }): MiddlewareOutput => {
    let currentValue = value;

    for (const step of steps) {
      const validator = validators[step];
      if (!validator) throw new Error(`Unknown validator: ${String(step)}`);

      const result = validator(currentValue);
      if (result.result === "not_accepted") return result;

      currentValue = result.value;
    }

    return {
      result: "accepted" as const,
      value: currentValue,
      errorCode: "NONE",
    };
  };
}

export function combineValidators<U extends ValidatorMap>(
  coreValidators: CoreValidators,
  customValidators: U
) {
  return {
    ...coreValidators,
    ...customValidators,
  };
}
