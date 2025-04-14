import { Exclude } from 'class-transformer'
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { Registration } from '../../registration/entities/registration.entity'

export enum UserRole {
  Admin = 'admin',
  Barber = 'barber',
  Client = 'client',
}

export enum UserOrigin {
  SMS = 'sms',
  Facebook = 'facebook',
  Instagram = 'instagram',
  Barber = 'barber',
}

export enum UserStatus {
  Ativo = 'actived',
  Bloqueado = 'bloqued',
  Cancelado = 'canceled',
}

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string

  @Column({ nullable: true })
  name: string

  @Column({ type: 'simple-enum' })
  status: UserStatus

  @Column({ name: 'contact_number' })
  contactNumber: string

  @Exclude()
  @Column()
  deviceId: string

  @Exclude()
  @Column()
  password: string

  @Column({ type: 'simple-enum' })
  role: UserRole

  @Exclude()
  @OneToMany(() => Registration, (registration) => registration)
  @JoinColumn({ name: 'registration_id' })
  registration: Registration

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  constructor(
    props: {
      name: string
      password: string
      contactNumber: string
      deviceId?: string
      role: UserRole
      createdAt: Date
    },
    id?: string,
  ) {
    this.status = UserStatus.Ativo
    Object.assign(this, props)
    this.id = id ?? crypto.randomUUID()
  }
}
