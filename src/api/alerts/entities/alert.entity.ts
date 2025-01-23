import { randomUUID } from 'node:crypto';
import { Company } from 'src/api/companies/entities/company.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

export enum AlertType {
  Home = 'home',
  Servicos = 'services',
  Historico = 'history',
}

export enum AlertStatus {
  Ativo = 'ativo',
  Pausado = 'inativo',
}

@Entity()
export class Alert {
  @PrimaryColumn()
  id: string;

  @Column()
  message: string;

  @Column({ type: 'simple-enum' })
  type: AlertType;

  @Column({ type: 'simple-enum' })
  status: AlertStatus;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @JoinColumn({ name: 'company_id' })
  @ManyToOne(() => Company, (company) => company, {
    cascade: true,
  })
  company: Company;

  constructor(props: {
    message: string;
    type: AlertType;
    company: Company;
    createdAt: Date;
  }) {
    Object.assign(this, props);
    this.status ||= AlertStatus.Ativo;
    this.id ||= randomUUID();
  }
}
