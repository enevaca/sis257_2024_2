import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { UpdateCancionDto } from './dto/update-cancion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancion } from './entities/cancion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CancionesService {
  constructor(
    @InjectRepository(Cancion)
    private cancionesRepository: Repository<Cancion>,
  ) {}

  async create(createCancioneDto: CreateCancionDto): Promise<Cancion> {
    const existe = await this.cancionesRepository.findOneBy({
      nombre: createCancioneDto.nombre.trim(),
      idAlbum: createCancioneDto.idAlbum,
    });

    if (existe) throw new ConflictException('La canción ya existe');

    const cancion = new Cancion();
    cancion.idAlbum = createCancioneDto.idAlbum;
    cancion.idGenero = createCancioneDto.idGenero;
    cancion.nombre = createCancioneDto.nombre.trim();
    cancion.duracion = createCancioneDto.duracion.trim();
    cancion.tags = createCancioneDto.tags.trim();
    cancion.url = createCancioneDto.url.trim();
    return this.cancionesRepository.save(cancion);
  }

  async findAll(): Promise<Cancion[]> {
    return this.cancionesRepository.find({ relations: ['album', 'genero'] });
  }

  async findOne(id: number): Promise<Cancion> {
    const cancion = await this.cancionesRepository.findOne({
      where: { id },
      relations: ['album', 'genero', 'album.interprete'],
    });
    if (!cancion) throw new NotFoundException('La canción no existe');
    return cancion;
  }

  async update(
    id: number,
    updateCancioneDto: UpdateCancionDto,
  ): Promise<Cancion> {
    const cancion = await this.cancionesRepository.findOneBy({ id });
    if (!cancion) throw new NotFoundException('La canción no existe');

    const cancionUpdate = Object.assign(cancion, updateCancioneDto);
    return this.cancionesRepository.save(cancionUpdate);
  }

  async remove(id: number) {
    const cancion = await this.cancionesRepository.findOneBy({ id });
    if (!cancion) throw new NotFoundException('La canción no existe');
    return this.cancionesRepository.softRemove(cancion);
  }
}
