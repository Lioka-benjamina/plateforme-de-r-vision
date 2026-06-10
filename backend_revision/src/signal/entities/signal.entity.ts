import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum SignalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ESCALATED = 'escalated',
}

@Entity('signals')
export class Signal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  targetType: string;

  @Column()
  targetId: string;

  @Column()
  targetName: string;

  @Column()
  reportedBy: string;

  @Column({ type: 'text' })
  reason: string;

  @Column({
    type: 'enum',
    enum: SignalStatus,
    default: SignalStatus.PENDING,
  })
  status: SignalStatus;

  @CreateDateColumn()
  date: Date;
}
