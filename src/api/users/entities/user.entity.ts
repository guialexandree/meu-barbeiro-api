import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum UserRole {
  Admin = 'admin',
  Barber = 'barber',
  Client = 'client',
  Visit = 'visit',
}

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  whatsapp: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'simple-enum' })
  role: UserRole;

  @Column({ type: 'datetime' })
  created_at: Date;

  constructor(
    props: {
      username: string;
      password: string;
      whatsapp: string;
      email: string;
      role: UserRole;
      created_at: Date
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}
