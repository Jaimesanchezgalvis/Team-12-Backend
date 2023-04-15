import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CategorySeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE categories CASCADE');
    await getManager().query(
      `INSERT INTO categories ("id", "name", "createdAt", "updatedAt")
      VALUES
         (1, 'Acción y aventuras', NOW(), NOW()),
         (2, 'Comedia', NOW(), NOW()),
         (3, 'Drama', NOW(), NOW()),
         (4, 'Ciencia ficción y fantasía', NOW(), NOW()),
         (5, 'Terror', NOW(), NOW()),
         (6, 'Suspense y misterio', NOW(), NOW()),
         (7, 'Romance', NOW(), NOW()),
         (8, 'Documentales', NOW(), NOW()),
         (9, 'Animación', NOW(), NOW()),
         (10, 'Musicales', NOW(), NOW()),
         (11, 'Westerns', NOW(), NOW()),
         (12, 'Películas de culto', NOW(), NOW()),
         (13, 'Clásicas', NOW(), NOW()),
         (14, 'Deportes', NOW(), NOW()),
         (15, 'Acción', NOW(), NOW()),
         (16, 'Crimen', NOW(), NOW()),
         (17, 'Familiar', NOW(), NOW()),
         (18, 'Guerra', NOW(), NOW()),
         (19, 'Historia', NOW(), NOW()),
         (20, 'Películas extranjeras', NOW(), NOW());
      `,
    );
  }
}
