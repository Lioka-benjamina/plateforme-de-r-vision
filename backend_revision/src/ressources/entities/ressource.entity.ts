import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RessourceType {
    PDF = "pdf",
    IMAGE = "image",
    VIDEO = "video",
    AUDIO = "audio"
}

@Entity("ressources")
export class Ressource {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column({
        type : "enum",
        enum : RessourceType,
        default : "pdf"
    })
    type : string
}
