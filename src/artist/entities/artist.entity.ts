import { Album } from "src/album/entities/album.entity";
import { BaseEntity } from "src/common/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Artist extends BaseEntity {
    @Column({ type: 'varchar' }) 
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'int' })
    age: number;

    @Column({ type: 'varchar' })
    url: string;

    @OneToMany(() => Album, album => album.artist)
    albums: Album[];
}
