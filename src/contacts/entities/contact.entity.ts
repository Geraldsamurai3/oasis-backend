import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum ContactReason {
  INFO_GENERAL = 'Información General',
  ORACION      = 'Oración',
  MINISTERIOS  = 'Ministerios',
  EVENTOS      = 'Eventos',
  DONACIONES   = 'Donaciones',
  OTRO         = 'Otro',
}

export enum ContactStatus {
  NUEVO       = 'Nuevo',
  EN_PROCESO  = 'En Proceso',
  RESPONDIDO  = 'Respondido',
  ARCHIVADO   = 'Archivado',
}

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column()
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: ContactReason })
  reason: ContactReason;

  @Column('text')
  message: string;

  @Column({ type: 'enum', enum: ContactStatus, default: ContactStatus.NUEVO })
  status: ContactStatus;

  @Column({ type: 'timestamp', nullable: true })
  respondedAt?: Date;

  @Column({ length: 100, nullable: true })
  assignedTo?: string;

  @CreateDateColumn()
  createdAt: Date;
}
