import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Gender } from '@app/films/entities/Gender.entity';
import { Category } from '@app/films/entities/Category.entity';
import { Rating } from '@app/films/entities/Rating.entity';
import { User } from '@app/auth/entities/User.entity';
import { AbstractEntity } from '@app/common/entities/AbstractEntity.entity';

@Entity('films')
export class Film extends AbstractEntity {
  static fieldsForQuery = [
    'director',
    'title',
    'sinopsis',
    'language',
    'gender.name',
    'category.name',
  ];
  @Column({ length: 200 })
  title: string;
  @Column({ nullable: true, length: 200 })
  poster_url: string;
  @Column({ length: 100 })
  director: string;
  @Column({ type: 'date' })
  release_date: Date;
  @Column({ type: 'text' })
  sinopsis: string;
  @Column({ length: 10 })
  language: string;

  @JoinColumn()
  @ManyToOne((_) => Gender, (gender) => gender.films, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  gender: Gender;

  @JoinColumn()
  @ManyToOne((_) => Category, (category) => category.films, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  category: Category;

  @JoinColumn()
  @ManyToOne((_) => User, (user) => user.films, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany((_) => Rating, (rating) => rating.film)
  ratings: Rating[];
}
