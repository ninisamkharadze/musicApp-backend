import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "../entities/artist.entity";
import { privateDecrypt } from "crypto";
import { Repository } from "typeorm";
import { CreateArtistDto } from "../dto/create-artist.dto";
import { UpdateArtistDto } from "../dto/update-artist.dto";

@Injectable()
export class ArtistRepository {
    constructor(
        @InjectRepository(Artist)
        private readonly artistRepo: Repository<Artist>
    ) {}

    create(data: CreateArtistDto) {
        const newArtist = this.artistRepo.create(data);
        return this.artistRepo.save(newArtist);
    }

    findAll() {
        return this.artistRepo.find();
    }

    findOne(id: number) {
        return this.artistRepo.findOneBy({ id });
    }

    update(id: number, data: UpdateArtistDto) {
        const updateArtist = this.findOne(id);
        if(!updateArtist) throw new NotFoundException('artist not found');
        Object.assign(updateArtist, data);

        return updateArtist;
    }

    delete(id: number) {
        this.artistRepo.delete(id);
    }
}