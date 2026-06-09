import { Matiere } from 'src/matiere/entities/matiere.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cours')
export class Cours {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column()
  contenu: string;

  @ManyToOne(() => Matiere, (matiere) => matiere.cours, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'matiere_id' })
  matiere: Matiere;

  @Column({ type: 'uuid' })
  matiere_id: string;

  // Relation avec User (Professeur)
  @ManyToOne(() => User, (user) => user.cours, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'auteur_id' })
  auteur: User;

  @Column({ default: false })
  valide: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_publication: Date;
}
