export type ValidationResult = "accepted" | "not_accepted";

export interface MiddlewareOutput {
  result: ValidationResult;
  value: string;
  error?: string;
  errorCode: string;
}

export type Validator = (value: string) => MiddlewareOutput;

export type ValidatorMap = Record<string, Validator>;
