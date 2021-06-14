import { HttpStatus } from '@nestjs/common';

export const ResponseSuccess = (message = "success", data) => {
  return {
    status: HttpStatus.OK,
    message,
    data
  }
}

export const ResponseError = (message, statusCode) => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  const findCode = codes.find((code) => code === statusCode);
  if (!findCode) statusCode = 500;
  else statusCode = findCode;
  return {
    message,
    status: statusCode,
    error: true
  };
}