export class FieldError {
  statusCode: number;
  message: string[];
  error: string;
}
export class BaseResponse {
  error?: FieldError;
}
