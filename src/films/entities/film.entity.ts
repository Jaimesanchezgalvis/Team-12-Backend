import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Gender } from './Gender.entity';
import { Category } from './Category.entity';
import { Rating } from './Ratings,entity';
import { User } from '@app/auth/entities/User.entity';

@Entity('films')
export class Film {
  @Column({ length: 200 })
  title: string;
  @Column({ nullable: true, length: 200 })
  poster: string;
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
