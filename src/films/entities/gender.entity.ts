import { AbstractEntity } from '@app/common/entities/AbstractEntity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Film } from './Film.entity';
@Entity('genders')
export class Gender extends AbstractEntity {
  @Column({ length: 100 })
  name: string;

  @OneToMany((_) => Film, (film) => film.gender)
  films: Film[];
}
