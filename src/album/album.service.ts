import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repositories/album.repository';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.create(createAlbumDto);
  }

  findAll() {
    return this.albumRepository.findAll();
  }

  findOne(id: number) {
    return this.albumRepository.findOne(id);
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.albumRepository.update(updateAlbumDto, id);
  }

  remove(id: number) {
    return this.albumRepository.delete(id);
  }
}
