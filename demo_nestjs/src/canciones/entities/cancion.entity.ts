import { Album } from 'src/albumes/entities/album.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('canciones')
export class Cancion {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_album' })
  idAlbum: number;

  @Column('integer', { name: 'id_genero' })
  idGenero: number;

  @Column('varchar', { length: 40 })
  nombre: string;

  @Column('varchar', { length: 8 })
  duracion: string;

  @Column('varchar', { length: 30 })
  tags: string;

  @Column('varchar', { length: 250 })
  url: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Album, (album) => album.canciones)
  @JoinColumn({ name: 'id_album', referencedColumnName: 'id' })
  album: Album;

  @ManyToOne(() => Genero, (genero) => genero.canciones)
  @JoinColumn({ name: 'id_genero', referencedColumnName: 'id' })
  genero: Genero;
}
