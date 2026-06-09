import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('quiz')
export class Quiz {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    titre: string

    @Column()
    cours_id: string

    @Column({ type: 'json', nullable: true })
    questions: {
        id: string
        texte: string
        options: { id: string; texte: string; correct?: boolean }[]
    }[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ nullable: true })
    auteur_id: string
}
