import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { PaymentAccount } from '../../shared/entities/payment-account.entity';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 100 })
  location: string;

  @OneToMany(() => PaymentAccount, (a) => a.mission, { cascade: true, eager: true })
  accounts: PaymentAccount[];

  @CreateDateColumn()
  createdAt: Date;
}
