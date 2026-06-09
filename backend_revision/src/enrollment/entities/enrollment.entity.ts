import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Cours } from 'src/cours/entities/cour.entity';

const jsonTransformer: ValueTransformer = {
  to: (value: string[] | null) => (value ? JSON.stringify(value) : '[]'),
  from: (value: string | null) => {
    if (!value) return [];
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  },
};

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

  @Column('text', { transformer: jsonTransformer })
  completedLessons: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrolledAt: Date;
}
