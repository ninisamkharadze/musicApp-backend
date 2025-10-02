import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    create(data: CreateUserDto) {
        const newUser = this.userRepo.create(data);
        return this.userRepo.save(newUser);
    }

    findAll() {
        return this.userRepo.find();
    }

    findOne(id: number) {
        return this.userRepo.findOneBy({ id });
    }

    async update(id: number, data: UpdateUserDto) {
        const updateUser = await this.findOne(id);
        if (!updateUser) throw new NotFoundException('user not found');
        Object.assign(updateUser, data);

        return this.userRepo.save(updateUser);
    }

    delete(id: number) {
        this.userRepo.delete(id);
    }
}