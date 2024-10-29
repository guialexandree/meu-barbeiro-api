import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  username: string;

  password: string;

  whatsapp?: string;

  email?: string;

  role?: UserRole
}
