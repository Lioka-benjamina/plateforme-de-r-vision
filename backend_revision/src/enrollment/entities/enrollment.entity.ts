import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Cours } from 'src/cours/entities/cour.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @ManyToOne(() => Cours, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cours_id' })
  cours: Cours;

  @Column()
  cours_id: string;

  @Column({ default: 0 })
  progress: number;

  @Column({ default: 0 })
  lessonsCompleted: number;

  @Column({ default: 0 })
  totalLessons: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrolledAt: Date;
}
