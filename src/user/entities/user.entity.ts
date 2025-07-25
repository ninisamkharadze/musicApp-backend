import { BaseEntity } from "src/common/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;
}
