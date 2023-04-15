import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class GenderSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE genders CASCADE');
    await getManager().query(
      `INSERT INTO genders (id, "name", "createdAt", "updatedAt") VALUES
      (1, 'Acción', NOW(), NOW()),
      (2, 'Aventura', NOW(), NOW()),
      (3, 'Comedia', NOW(), NOW()),
      (4, 'Drama', NOW(), NOW()),
      (5, 'Ciencia ficción', NOW(), NOW()),
      (6, 'Fantasía', NOW(), NOW()),
      (7, 'Terror', NOW(), NOW()),
      (8, 'Suspense', NOW(), NOW()),
      (9, 'Misterio', NOW(), NOW()),
      (10, 'Romance', NOW(), NOW()),
      (11, 'Documental', NOW(), NOW()),
      (12, 'Animación', NOW(), NOW()),
      (13, 'Musical', NOW(), NOW()),
      (14, 'Western', NOW(), NOW()),
      (15, 'Histórico', NOW(), NOW()),
      (16, 'Bélico', NOW(), NOW()),
      (17, 'Crimen', NOW(), NOW()),
      (18, 'Deportes', NOW(), NOW()),
      (19, 'Familiar', NOW(), NOW()),
      (20, 'Cine negro', NOW(), NOW());`,
    );
  }
}
