import { Music } from "src/music/entities/music.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' }) 
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'int' })
    age: number;

    @Column({ type: 'varchar' })
    nationality: string;

    @OneToMany(() => Music, (music) => music.artist)
    musics: Music[];
}
