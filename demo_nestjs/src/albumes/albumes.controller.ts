import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlbumesService } from './albumes.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('albumes')
@Controller('albumes')
export class AlbumesController {
  constructor(private readonly albumesService: AlbumesService) {}

  @Post()
  create(@Body() createAlbumeDto: CreateAlbumDto) {
    return this.albumesService.create(createAlbumeDto);
  }

  @Get()
  findAll() {
    return this.albumesService.findAll();
  }

  @Get('interprete/:idInterprete')
  findByInterprete(@Param('idInterprete') idInterprete: string) {
    return this.albumesService.findByInterprete(+idInterprete);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumeDto: UpdateAlbumDto) {
    return this.albumesService.update(+id, updateAlbumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumesService.remove(+id);
  }
}
