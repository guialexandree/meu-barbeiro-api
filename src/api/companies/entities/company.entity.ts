import { CompaniesOfficeHour } from 'src/api/companies-office-hours/entities/companies-office-hour.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  pix: string;

  @OneToMany(() => CompaniesOfficeHour, (officeHour) => officeHour.company, {
    cascade: true,
    eager: true
  })
  @JoinColumn()
  officeHours: CompaniesOfficeHour[];

  constructor(
    props: {
      name: string;
      pix: string;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id || crypto.randomUUID();
  }
}
