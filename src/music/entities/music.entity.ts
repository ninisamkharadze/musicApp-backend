import { Artist } from "src/artist/entities/artist.entity";
import { BaseEntity } from "src/common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Music extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    image: string;

    @ManyToOne(() => Artist, (artist) => artist.musics)
    artist: Artist;
}
