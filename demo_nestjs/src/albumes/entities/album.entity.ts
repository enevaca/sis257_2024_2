import { Cancion } from 'src/canciones/entities/cancion.entity';
import { Interprete } from 'src/interpretes/entities/interprete.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('albumes')
export class Album {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 70 })
  nombre: string;

  @Column('date', { name: 'fecha_lanzamiento' })
  fechaLanzamiento: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Interprete, (interprete) => interprete.albumes)
  @JoinColumn({ name: 'id_interprete', referencedColumnName: 'id' })
  interprete: Interprete;

  @OneToMany(() => Cancion, (cancion) => cancion.album)
  canciones: Cancion[];
}
