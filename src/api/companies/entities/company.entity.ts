import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'

@Entity()
export class Company {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  pix: string

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
