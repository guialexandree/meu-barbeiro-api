import { Column, Entity, PrimaryColumn } from 'typeorm'

export enum StatusAttendanceCompany {
  Serving = 'serving',
  Closed = 'closed',
  InPause = 'in_pause',
}

@Entity('companies')
export class Company {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  pix: string

  @Column({ type: 'simple-enum', name: 'status_attendance'  })
  statusAttendance: StatusAttendanceCompany

  constructor(
    props: {
      name?: string
      pix?: string
    },
    id?: string,
  ) {
    Object.assign(this, props)
    this.id = id || crypto.randomUUID()
    this.statusAttendance = StatusAttendanceCompany.Closed
  }
}
