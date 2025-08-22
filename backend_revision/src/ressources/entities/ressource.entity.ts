import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum RessourceType {
    PDF = "pdf",
    IMAGE = "image",
    VIDEO = "video",
    AUDIO = "audio",
    DOC = "doc"
}

@Entity("ressources")
export class Ressource {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column({
        type : "enum",
        enum : RessourceType,
        default : RessourceType.PDF
    })
    type : string

    @Column()
    url : string

    @Column()
    description : string

    // @ManyToOne(()=>)
}
