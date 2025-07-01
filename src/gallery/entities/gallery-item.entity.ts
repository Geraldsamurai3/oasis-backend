import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class GalleryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  mediaUrl: string;

  @ManyToOne(() => Category, (cat) => cat.items, { eager: true })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;
}
