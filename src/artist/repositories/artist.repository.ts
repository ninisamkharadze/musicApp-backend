import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "../entities/artist.entity";
import { Repository } from "typeorm";
import { CreateArtistDto } from "../dto/create-artist.dto";
import { UpdateArtistDto } from "../dto/update-artist.dto";
import { S3Service } from "src/s3/s3.service";

@Injectable()
export class ArtistRepository {
    constructor(
        @InjectRepository(Artist)
        private readonly artistRepo: Repository<Artist>,
        private readonly s3Service: S3Service,
    ) {}

    async create(data: CreateArtistDto, file: Express.Multer.File) {
        const newArtist = this.artistRepo.create(data);
        const uploadedFile = await this.s3Service.upload({
            file: file.buffer,
            name: file.originalname,
            mimeType: file.mimetype,
        })
        console.log(uploadedFile)
        return this.artistRepo.save({
            ...newArtist,
            url: uploadedFile.Location,
        });
    }

    findAll() {
        return this.artistRepo.find();
    }

    findOne(id: number) {
        return this.artistRepo.findOneBy({ id });
    }

    async update(id: number, data: UpdateArtistDto) {
        const updateArtist = await this.findOne(id);
        if(!updateArtist) throw new NotFoundException('artist not found');
        Object.assign(updateArtist, data);

        return this.artistRepo.save(updateArtist);
    }

    delete(id: number) {
        this.artistRepo.delete(id);
    }
}