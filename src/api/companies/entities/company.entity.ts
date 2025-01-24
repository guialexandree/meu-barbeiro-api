import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { CompaniesOfficeHour } from '../../companies-office-hours/entities/companies-office-hour.entity'

@Entity()
export class Company {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  pix: string

  @OneToMany(() => CompaniesOfficeHour, (officeHour) => officeHour.company, {
    eager: true,
  })
  @JoinColumn()
  officeHours: CompaniesOfficeHour[]

  constructor(
    props: {
      name?: string
      pix?: string
    },
    id?: string,
  ) {
    Object.assign(this, props)
    this.id = id || crypto.randomUUID()
  }
}
