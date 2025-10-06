import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './repositories/artist.repository';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository
  ) {}

  create(createArtistDto: CreateArtistDto, file: Express.Multer.File) {
    return this.artistRepository.create(createArtistDto, file);
  }

  findAll() {
    return this.artistRepository.findAll();
  }

  findOne(id: number) {
    return this.artistRepository.findOne(id);
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.update(id, updateArtistDto);
  }

  remove(id: number) {
    return this.artistRepository.delete(id);
  }
}
