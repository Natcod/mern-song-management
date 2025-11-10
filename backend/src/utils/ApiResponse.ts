export class ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;

  constructor(statusCode: number, message: string, data?: T) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}
