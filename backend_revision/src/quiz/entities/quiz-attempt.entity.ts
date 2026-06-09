import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_attempt')
export class QuizAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quiz_id: string;

  @Column()
  user_id: string;

  @Column({ type: 'json' })
  answers: Record<string, string>;

  @Column()
  score: number;

  @Column()
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
