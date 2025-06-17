export type ValidationResult = "accepted" | "not_accepted";

export interface MiddlewareOutput<T = any> {
  result: ValidationResult;
  value: T;
  error?: string;
  errorCode: string;
}

export type Validator<T = any, R = T> = (value: T) => MiddlewareOutput<R>;

export type ValidatorMap = Record<string, Validator>;

export interface ValidationInput<
  T = any,
  V extends ValidatorMap = ValidatorMap
> {
  value: T;
  steps: readonly (keyof V)[];
}

export type ValidationMiddleware<T extends ValidatorMap> = <
  K extends readonly (keyof T)[]
>(
  input: ValidationInput<any, T> & { steps: K }
) => MiddlewareOutput;
