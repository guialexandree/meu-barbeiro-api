import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidRuleException extends HttpException {
  constructor(error: string) {
    super(error, HttpStatus.BAD_REQUEST)
  }
}
