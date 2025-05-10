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

  @Column({ nullable: true })
  nickname: string

  @Column({ type: 'simple-enum' })
  status: UserStatus

  @Column({ name: 'contact_number' })
  contactNumber: string

  @Column({ default: false, name: 'model' })
  default: boolean

  @Exclude()
  @Column({ nullable: true, name: 'device_id' })
  deviceId: string

  @Exclude()
  @Column()
  password: string

  @Column({ type: 'simple-enum' })
  role: UserRole

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  constructor(
    props: {
      name: string
      password?: string
      contactNumber?: string
      deviceId?: string
      createdAt: Date
      role: UserRole
    },
    id?: string,
  ) {
    this.status = UserStatus.Ativo
    Object.assign(this, props)
    this.id = id ?? crypto.randomUUID()
  }
}
