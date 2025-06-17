import { ValidationInput, ValidationMiddleware, ValidatorMap } from "./types";
import { coreValidators, CoreValidators } from "./validators/core";

export function createValidationMiddleware<T extends ValidatorMap>(
  validators: T
): ValidationMiddleware<T> {
  return ((...args: any[]) => {
    const input = args[args.length - 1] as ValidationInput;
    const steps = args.slice(0, -1) as (keyof T)[];
    let currentValue = input.value;
    for (const step of steps) {
      const validator = validators[step];
      if (!validator) throw new Error(`Unknown validator: ${String(step)}`);
      const result = validator(currentValue);
      if (result.result === "not_accepted") {
        return result;
      }
      currentValue = result.value;
    }

    return {
      result: "accepted" as const,
      value: currentValue,
      error: undefined,
      errorCode: "NONE",
    };
  }) as ValidationMiddleware<T>;
}

export type ExtendedValidators<T extends ValidatorMap> = T & CoreValidators;

export function extendValidators<T extends ValidatorMap>(
  customValidators: T
): ExtendedValidators<T> {
  return {
    ...coreValidators,
    ...customValidators,
  } as ExtendedValidators<T>;
}
