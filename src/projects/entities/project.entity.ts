import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { PaymentAccount } from '../../shared/entities/payment-account.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 100 })
  location: string;

  @OneToMany(() => PaymentAccount, (a) => a.project, { cascade: true, eager: true })
  accounts: PaymentAccount[];

  @CreateDateColumn()
  createdAt: Date;
}
