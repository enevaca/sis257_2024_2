import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenerosService {
  constructor(
    @InjectRepository(Genero)
    private generosRepository: Repository<Genero>,
  ) {}

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    const existe = await this.generosRepository.findOneBy({
      descripcion: createGeneroDto.descripcion.trim(),
    });
    if (existe) throw new ConflictException('El género ya existe');

    const genero = new Genero();
    genero.descripcion = createGeneroDto.descripcion.trim();
    return this.generosRepository.save(genero);
  }

  async findAll(): Promise<Genero[]> {
    return this.generosRepository.find();
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.generosRepository.findOneBy({ id });
    if (!genero) throw new NotFoundException('El género no existe');
    return genero;
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<Genero> {
    const genero = await this.findOne(id);
    const generoUpdate = Object.assign(genero, updateGeneroDto);
    return this.generosRepository.save(generoUpdate);
  }

  async remove(id: number) {
    const genero = await this.findOne(id);
    return this.generosRepository.softRemove(genero);
  }
}
