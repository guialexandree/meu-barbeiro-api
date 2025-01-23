import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export type DefaultErrorResponse = {
  statusCode: number;
  message: string[];
  error: string;
  validationErrors?: ValidationError[];
};

export class InvalidRuleException extends HttpException {
  constructor(message: string[]) {
    const response: DefaultErrorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      error: 'Bad Request',
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}
