import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('interpretes')
export class Interprete {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 30 })
  nacionalidad: string;
}
