import { Registration } from 'src/api/registration/entities/registration.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

export enum UserRole {
  Admin = 'admin',
  Barber = 'barber',
  Client = 'client'
}

export enum UserOrigin {
  SMS = 'sms',
  Facebook = 'facebook',
  Instagram = 'instagram',
  Barber = 'barber'
}

export enum UserStatus {
  Ativo = 'actived',
  Bloqueado = 'bloqued',
  Cancelado = 'canceled',
}

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  deviceId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'simple-enum' })
  status: UserStatus

  @Column()
  username: string;

  @Column()
  contactNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'simple-enum' })
  role: UserRole;

  @OneToMany(() => Registration, (registration) => registration)
  @JoinColumn({ name: 'registration_id' })
  registration: Registration

  @Column({ type: 'datetime' })
  createdAt: Date;

  constructor(
    props: {
      name?: string;
      username: string;
      password: string;
      contactNumber?: string;
      email?: string;
      role: UserRole;
      createdAt: Date
    },
    id?: string,
  ) {
    this.status = UserStatus.Ativo
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}
