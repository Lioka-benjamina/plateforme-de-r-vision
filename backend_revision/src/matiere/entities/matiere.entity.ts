import { Cours } from 'src/cours/entities/cour.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Niveau {
  CEPE = 'CEPE',
  BEPC = 'BEPC',
  BAC = 'BAC',
}

@Entity('matiere')
export class Matiere {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column({
    type: 'enum',
    enum: Niveau,
  })
  niveau: Niveau;

  @OneToMany(() => Cours, (cours) => cours.matiere)
  cours: Cours[];
}
