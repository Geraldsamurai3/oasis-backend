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

  @Column()
  mediaUrl?: string;

  @ManyToOne(() => Category, (cat) => cat.items, { eager: true })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;
}
