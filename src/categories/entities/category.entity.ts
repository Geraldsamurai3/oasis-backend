import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GalleryItem } from '../../gallery/entities/gallery-item.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  name: string;

  @OneToMany(() => GalleryItem, (item) => item.category)
  items: GalleryItem[];
}
