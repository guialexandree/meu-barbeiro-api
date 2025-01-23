import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class CreateAttendanceDto {
  @ApiProperty()
  @IsArray()
  services: string[];
}
