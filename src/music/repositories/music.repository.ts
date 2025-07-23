import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "../entities/music.entity";
import { Repository } from "typeorm";

@Injectable()
export class musicRepository {
    constructor(
        @InjectRepository(Music)
        private readonly musicRepo: Repository<Music>
    ) {}
}