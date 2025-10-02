import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "../entities/music.entity";
import { Repository } from "typeorm";
import { CreateMusicDto } from "../dto/create-music.dto";
import { UpdateMusicDto } from "../dto/update-music.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class musicRepository {
    constructor(
        @InjectRepository(Music)
        private readonly musicRepo: Repository<Music>
    ) {}

    create(data: CreateMusicDto) {
        const newMusic = this.musicRepo.create(data);
        return this.musicRepo.save(newMusic);
    }

    findAll() {
        return this.musicRepo.find();
    }

    findOne(id: number) {
        return this.musicRepo.findOneBy({ id });
    }

    async update(id: number, data: UpdateMusicDto) {
        const updateMusic = await this.findOne(id);
        if(!updateMusic) throw new NotFoundException('music not found');

        Object.assign(updateMusic, data);
        return this.musicRepo.save(updateMusic);
    }

    delete(id: number) {
        this.musicRepo.delete(id);
    }
}