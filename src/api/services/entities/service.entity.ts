import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'node:crypto';
import { Exclude } from 'class-transformer';

export enum ServiceStatus {
  Ativo = 'ativo',
  Inativo = 'inativo',
}

@Entity()
export class Service {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  time_execution: number;

  @Exclude()
  @Column({ type: 'simple-enum' })
  status: ServiceStatus;

  @Exclude()
  @Column({ type: 'datetime' })
  created_at: Date;

  @Exclude()
  @Column({ nullable: true, type: 'datetime' })
  updated_at: Date | null;

  constructor(
    props: {
      name: string;
      description: string;
      amount: number;
      time_execution: number;
      created_at: Date;
      status: ServiceStatus;
      updated_at?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}
