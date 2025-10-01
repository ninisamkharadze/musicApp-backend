import { Artist } from "src/artist/entities/artist.entity";
import { BaseEntity } from "src/common/base.entity";
import { Music } from "src/music/entities/music.entity";
import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @ManyToMany(() => Music, music => music.albums)
    @JoinTable()
    musics: Music[];

    @ManyToOne(() => Artist, Artist => Artist.albums)
    artist: Artist;
}
