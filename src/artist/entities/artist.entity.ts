import { Music } from "src/music/entities/music.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Music, (music) => music.artist)
    musics: Music[];
}
