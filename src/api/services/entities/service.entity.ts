import crypto from 'node:crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum ServiceStatus {
  Ativo = 'actived',
  Inativo = 'deactivated',
}

@Entity('services')
export class Service {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true})
  description?: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column({ default: 0, name: 'time_execution' })
  timeExecution: number;

  @Column({ type: 'simple-enum' })
  status: ServiceStatus;

  @Exclude()
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @Column({ nullable: true, type: 'timestamp', name: 'updated_at' })
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
