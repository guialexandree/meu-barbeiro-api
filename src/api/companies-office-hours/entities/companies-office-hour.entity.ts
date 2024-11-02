import { Company } from 'src/api/companies/entities/company.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class CompaniesOfficeHour {
  @PrimaryColumn()
  id: string;

  @Column()
  weekDay: number;

  @Column({ type: 'datetime' })
  start: Date;

  @Column({ type: 'datetime' })
  end: Date;

  @JoinColumn({ name: 'company_id' })
  @ManyToOne(() => Company, (company) => company)
  company: Company;

  constructor(
    props: {
      weekDay: number;
      start: Date;
      end: Date;
      company: Company;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id || crypto.randomUUID();
  }
}
