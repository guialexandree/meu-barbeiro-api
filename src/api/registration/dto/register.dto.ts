import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class RegisterDto {
  @ApiProperty()
  @Length(14, 14)
  @IsNotEmpty()
  contactNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;
}
