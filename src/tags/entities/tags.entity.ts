/* istanbul ignore file */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from '../../movies/entities/movies.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @ApiHideProperty()
  @ManyToMany(
    type => Movie,
    movie => movie.tags,
  )
  movies: Movie[];
}
