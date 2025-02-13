export type Result<T> = ({
  readonly successeful: true;
} & SuccessResult<T>) | ({
  readonly successeful: false;
} & ErrorResult);

export interface SuccessResult<T> {
  readonly result: T;
}

export interface ErrorResult {
  readonly resultCode?: 404 | 403 | 500;
  errorMessage: string;
}

export function result404<T>(errorMessage: string): Result<T> {
  return {
    successeful: false,
    resultCode: 404,
    errorMessage,
  };
}

export function clientError<T>(errorMessage: string): Result<T> {
  return {
    successeful: false,
    errorMessage,
  };
}

export function result500<T>(errorMessage: string): Result<T> {
  return {
    successeful: false,
    resultCode: 500,
    errorMessage: `Internal Server Error: ${errorMessage}`,
  };
}

export function toResult<T>(result: T): Result<T> {
  return {
    successeful: true,
    result,
  };
}
