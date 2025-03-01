import { randomUUID } from 'node:crypto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

export enum AlertType {
  Home = 'home',
  Servicos = 'services',
  Historico = 'history',
}

export enum AlertStatus {
  Ativo = 'ativo',
  Pausado = 'inativo',
}

@Entity('alerts')
export class Alert {
  @PrimaryColumn()
  id: string

  @Column()
  message: string

  @Column({ type: 'simple-enum' })
  type: AlertType

  @Column({ type: 'simple-enum' })
  status: AlertStatus

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  constructor(props: { message: string; type: AlertType; createdAt: Date }) {
    Object.assign(this, props)
    this.status ||= AlertStatus.Ativo
    this.id ||= randomUUID()
  }
}
