import { HttpException, HttpStatus } from '@nestjs/common'

export class NoContentException extends HttpException {
  constructor(error: string) {
    super(error, HttpStatus.NO_CONTENT)
  }
}
