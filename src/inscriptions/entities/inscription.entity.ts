import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class Inscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: false })
  wantsEvents: boolean;

  @Column({ default: false })
  wantsMissions: boolean;

  @Column({ default: false })
  wantsProjects: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
