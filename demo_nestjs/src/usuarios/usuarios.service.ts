import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existe = await this.usuariosRepository.findOneBy({
      usuario: createUsuarioDto.usuario.trim(),
    });
    if (existe) throw new ConflictException('El usuario ya existe');

    const usuario = new Usuario();
    usuario.usuario = createUsuarioDto.usuario.trim();
    usuario.clave = process.env.DEFAULT_PASSWORD;
    usuario.email = createUsuarioDto.email.trim();
    usuario.rol = createUsuarioDto.rol.trim();
    usuario.premium = createUsuarioDto.premium;

    return this.usuariosRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('El usuario no existe');
    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(id);
    const usuarioUpdate = Object.assign(usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuarioUpdate);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuariosRepository.softRemove(usuario);
  }
}
