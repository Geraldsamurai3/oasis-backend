// src/shared/entities/payment-account.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Mission } from '../../missions/entities/mission.entity';
import { Project } from 'src/projects/entities/project.entity';

export type AccountType = 'SINPE' | 'BANK';

@Entity()
export class PaymentAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['SINPE', 'BANK'] })
  type: AccountType;

  @Column({ nullable: true, length: 20 })
  sinpeNumber?: string;

  @Column({ nullable: true, length: 50 })
  bankName?: string;

  @Column({ nullable: true, length: 30 })
  bankAccountNumber?: string;

  @ManyToOne(() => Mission, (m) => m.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'missionId' })
  mission?: Mission;

  @Column({ nullable: true })
  missionId?: number;

  @ManyToOne(() => Project, (p) => p.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project?: Project;

  @Column({ nullable: true })
  projectId?: number;
}
