import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Interprete } from 'src/interpretes/entities/interprete.entity';

@Injectable()
export class AlbumesService {
  constructor(
    @InjectRepository(Album)
    private albumesRepository: Repository<Album>,
  ) {}

  async create(createAlbumeDto: CreateAlbumDto): Promise<Album> {
    const existe = await this.albumesRepository.findOneBy({
      nombre: createAlbumeDto.nombre.trim(),
      interprete: { id: createAlbumeDto.idInterprete },
    });
    if (existe) throw new ConflictException('El album ya existe');

    const album = new Album();
    album.nombre = createAlbumeDto.nombre.trim();
    album.fechaLanzamiento = createAlbumeDto.fechaLanzamiento;
    album.interprete = { id: createAlbumeDto.idInterprete } as Interprete;
    return this.albumesRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumesRepository.find({ relations: ['interprete'] });
  }

  async findOne(id: number): Promise<Album> {
    const album = this.albumesRepository.findOne({
      where: { id },
      relations: ['interprete'],
    });
    if (!album) throw new NotFoundException('El album no existe');
    return album;
  }

  async update(id: number, updateAlbumeDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    album.nombre = updateAlbumeDto.nombre.trim();
    album.fechaLanzamiento = updateAlbumeDto.fechaLanzamiento;
    album.interprete = { id: updateAlbumeDto.idInterprete } as Interprete;
    return this.albumesRepository.save(album);
  }

  async remove(id: number) {
    const album = await this.findOne(id);
    return this.albumesRepository.softRemove(album);
  }
}
