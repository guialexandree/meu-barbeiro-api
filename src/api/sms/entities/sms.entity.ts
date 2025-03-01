import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sms')
export class Sms {
  @PrimaryColumn()
  id: string;

  @Column()
  message: string;

  @Column()
  contactNumber: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  response: string;

  constructor(
    props: {
      contactNumber: string;
      message: string;
      date: Date;
      response: string;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id || crypto.randomUUID();
  }
}
