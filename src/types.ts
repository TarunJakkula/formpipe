export type MiddlewareResult = "accepted" | "not_accepted";

export type MiddlewareOutput<ErrorCode extends string = string> = {
  result: MiddlewareResult;
  value: any;
  error: string | undefined;
  errorCode: ErrorCode;
};

export type Validator<ErrorCode extends string = string> = (
  value: any
) => MiddlewareOutput<ErrorCode>;

export type ValidatorMap<ErrorCode extends string = string> = Record<
  string,
  Validator<ErrorCode>
>;
