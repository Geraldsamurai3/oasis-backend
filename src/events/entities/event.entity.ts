// src/events/entities/event.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 100 })
  location: string;

  @Column({ type: 'datetime', nullable: true })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;
}
