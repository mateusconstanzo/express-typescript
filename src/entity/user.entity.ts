import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column("varchar", {
        length: 100
    })
    username: string;

    @Column("varchar", {
        length: 100
    })
    password: string;

    @Column("tinyint")
    active: boolean;

}