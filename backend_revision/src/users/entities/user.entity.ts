import { Cours } from "src/cours/entities/cour.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ELEVE = "eleve",
    PROF = "prof",
    ADMIN = "admin",
    PARENT = "parent"
}

export enum UserStatus{
    ACTIVE = "active",
    PENDING = "pending",
    BANNED = "banned"
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({unique : true})
    email : string

    @Column()
    nom : string

    @Column()
    prenom : string

    @Column()
    mot_de_pass : string

    @Column({
        type : "enum",
        enum :  UserRole ,
        default : UserRole.ELEVE
    })
    role : UserRole

    @Column({
        type : "enum",
        enum : UserStatus ,
        default : UserStatus.ACTIVE
    })
    status :UserStatus

    @OneToMany(() => Cours, (cours) => cours.auteur)
    cours: Cours[];
}
