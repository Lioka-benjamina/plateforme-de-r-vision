import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cours } from 'src/cours/entities/cour.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  contenu: string;

  @Column({ nullable: true })
  duree: string;

  @Column({ default: 0 })
  ordre: number;

  @ManyToOne(() => Cours, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cours_id' })
  cours: Cours;

  @Column()
  cours_id: string;

  @Column({ type: 'varchar', default: 'en_attente' })
  status: string;
}
