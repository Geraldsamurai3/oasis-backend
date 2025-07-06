/* eslint-disable prettier/prettier */
// src/auth/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 100, nullable: true })
  secondLastName?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ default: 'Admin' })
  role: string;

  @Column({ default: false })
  isBlocked: boolean;            // ← bloqueo de usuario

  @CreateDateColumn()
  createdAt: Date;
}
