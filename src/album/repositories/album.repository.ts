import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Album } from "../entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "../dto/create-album.dto";
import { UpdateAlbumDto } from "../dto/update-album.dto";

@Injectable()
export class AlbumRepository {
    constructor(
        @InjectRepository(Album)
        private readonly albumRepo: Repository<Album>
    ) {}

    create(data: CreateAlbumDto) {
        const newAlbum = this.albumRepo.create(data);
        return this.albumRepo.save(newAlbum);
    }

    findAll() {
        return this.albumRepo.find();
    }

    findOne(id: number) {
        return this.albumRepo.findOneBy({ id });
    }

    async update(data: UpdateAlbumDto, id: number) {
        const updateAlbum = await this.findOne(id);
        if(!updateAlbum) throw new NotFoundException('album not found');
        Object.assign(updateAlbum, data);

        return this.albumRepo.save(updateAlbum);
    }

    delete(id: number) {
        this.albumRepo.delete(id);
    }
}