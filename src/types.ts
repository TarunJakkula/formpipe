// types.ts
export type ValidationResult = "accepted" | "not_accepted";

export interface MiddlewareOutput<T = any> {
  result: ValidationResult;
  value: T;
  error?: string;
  errorCode: string;
}

export type Validator<T = any, R = T> = (value: T) => MiddlewareOutput<R>;

export type ValidatorMap = Record<string, Validator>;

export interface ValidationInput<T = any> {
  value: T;
}

// Extract validator names as a union type
export type ValidatorKeys<T extends ValidatorMap> = keyof T;

// Middleware function type with proper generics
export type ValidationMiddleware<T extends ValidatorMap> = <
  K extends ValidatorKeys<T>[]
>(
  ...args: [...steps: K, input: ValidationInput]
) => MiddlewareOutput;
