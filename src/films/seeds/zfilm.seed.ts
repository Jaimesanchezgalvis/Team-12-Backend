import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class FilmSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE films CASCADE');
    await getManager().query(
      `INSERT INTO films ("id","title", "sinopsis", "release_date", "poster_url", "userId", "categoryId", "director", "language", "genderId")
      VALUES
      (1,'The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', '1994-09-23', 'https://www.example.com/posters/shawshank_redemption.jpg', 1, 1, 'Frank Darabont', 'English', 2),
      (2,'The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', '1972-03-24', 'https://www.example.com/posters/godfather.jpg', 1, 1, 'Francis Ford Coppola', 'English', 4),
      (3,'The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', '2008-07-18', 'https://www.example.com/posters/dark_knight.jpg', 1, 3, 'Christopher Nolan', 'English', 5),
      (4,'12 Angry Men', 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.', '1957-04-10', 'https://www.example.com/posters/12_angry_men.jpg', 1, 2, 'Sidney Lumet', 'English', 6),
      (5,'Schindlers List', 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', '1993-12-15', 'https://www.example.com/posters/schindlers_list.jpg', 1, 1, 'Steven Spielberg', 'English', 1),
      (6,'The Lord of the Rings: The Return of the King', 'Gandalf and Aragorn lead the World of Men against Sauron army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', '2003-12-17', 'https://www.example.com/posters/lotr_return_king.jpg', 1, 4, 'Peter Jackson', 'English', 7),
      (7,'Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', '1994-10-14', 'https://www.example.com/posters/pulp_fiction.jpg', 1, 2, 'Quentin Tarantino', 'English', 1)`,
    );
  }
}
