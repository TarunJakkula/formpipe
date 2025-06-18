import {
  MiddlewareOutput,
  ValidationInput,
  ValidationMiddleware,
  ValidatorMap,
} from "./types.js";

export function createValidationMiddleware<T extends ValidatorMap>(
  validators: T
): ValidationMiddleware<T> {
  return <K extends readonly (keyof T)[]>(
    input: ValidationInput<any, T> & { steps: K }
  ): MiddlewareOutput => {
    let currentValue = input.value;

    for (const step of input.steps) {
      const validator = validators[step];
      if (!validator) throw new Error(`Unknown validator: ${String(step)}`);

      const result = validator(currentValue);
      if (result.result === "not_accepted") return result;

      currentValue = result.value;
    }

    return {
      result: "accepted" as const,
      value: currentValue,
      error: undefined,
      errorCode: "NONE",
    };
  };
}

export function combineValidators<
  T extends ValidatorMap,
  U extends ValidatorMap
>(coreValidators: T, customValidators: U): T & U {
  return {
    ...coreValidators,
    ...customValidators,
  } as T & U;
}
