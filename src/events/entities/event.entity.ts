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

  // Fecha de inicio obligatoria (solo fecha)
  @Column({ type: 'date' })
  startDate: Date;

  // Fecha de fin opcional
  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  // Hora de inicio opcional (HH:MM:SS)
  @Column({ type: 'time', nullable: true })
  startTime?: string;

  // Hora de fin opcional
  @Column({ type: 'time', nullable: true })
  endTime?: string;

  // URL de imagen opcional
  @Column({ length: 255, nullable: true })
  imageUrl?: string;

  // Nuevo campo: enlace de información adicional
  @Column({ length: 500, nullable: true })
  additionalLink?: string;

  @CreateDateColumn()
  createdAt: Date;
}
