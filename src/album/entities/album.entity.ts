import { BaseEntity } from "src/common/base.entity";
import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;
}
