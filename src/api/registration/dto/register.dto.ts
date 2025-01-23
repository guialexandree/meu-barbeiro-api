import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class RegisterDto {
  @ApiProperty()
  @Length(11, 11, { message: 'O número de contato deve conter 11 digitos.' })
  @IsNotEmpty()
  contactNumber: string;
}
