import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 15 })
  usuario: string;

  @Column('varchar', { length: 250, select: false })
  clave: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 15 })
  rol: string;

  @Column('boolean')
  premium: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.clave = await bcrypt.hash(this.clave, salt);
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.clave);
  }
}
