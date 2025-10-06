import { Album } from "src/album/entities/album.entity";
import { Artist } from "src/artist/entities/artist.entity";
import { BaseEntity } from "src/common/base.entity";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class Music extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    image: string;

    @ManyToMany(() => Album, (album) => album.musics)
    albums: Album[];
}
