import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum ContactReason {
  INFO_GENERAL    = 'Información General',
  ORACION         = 'Oración',
  MINISTERIOS     = 'Ministerios',
  EVENTOS         = 'Eventos',
  DONACIONES      = 'Donaciones',
  OTRO            = 'Otro',
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

  @CreateDateColumn()
  createdAt: Date;
}
