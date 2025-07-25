import { BaseEntity } from "src/common/base.entity";
import { Music } from "src/music/entities/music.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Artist extends BaseEntity {
    @Column({ type: 'varchar' }) 
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'int' })
    age: number;

    @OneToMany(() => Music, (music) => music.artist)
    musics: Music[];
}
