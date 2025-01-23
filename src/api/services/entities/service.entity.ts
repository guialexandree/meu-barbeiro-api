import crypto from 'node:crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum ServiceStatus {
  Ativo = 'ativo',
  Inativo = 'inativo',
}

@Entity()
export class Service {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true})
  description?: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column({ default: 0 })
  timeExecution: number;

  @Column({ type: 'simple-enum' })
  status: ServiceStatus;

  @Exclude()
  @Column({ type: 'datetime' })
  createdAt: Date;

  @Exclude()
  @Column({ nullable: true, type: 'datetime' })
  updatedAt: Date | null;

  constructor(
    props: {
      name: string;
      description: string;
      price: number;
      timeExecution: number;
      status: ServiceStatus;
      createdAt: Date;
      updatedAt?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id || crypto.randomUUID();
  }
}
