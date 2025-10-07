import { Injectable, NotFoundException, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "../entities/music.entity";
import { Repository } from "typeorm";
import { CreateMusicDto } from "../dto/create-music.dto";
import { UpdateMusicDto } from "../dto/update-music.dto";
import { S3Service } from "src/s3/s3.service";

@Injectable()
export class musicRepository {
    constructor(
        @InjectRepository(Music)
        private readonly musicRepo: Repository<Music>,
        private readonly s3Service: S3Service
    ) {}

    async create(data: CreateMusicDto, file: Express.Multer.File) {
        const newMusic = this.musicRepo.create(data);
        const uploadedFile = await this.s3Service.upload({
            file: file.buffer,
            name: file.originalname,
            mimeType: file.mimetype,
        })
        if(!uploadedFile) throw new NotFoundException('file is missing');

        return this.musicRepo.save({
            ...newMusic,
            url: uploadedFile.Location,
        });
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