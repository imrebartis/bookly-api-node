const { Genre } = require("./models/genre");
const { Book } = require("./models/book");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Fantasy",
    books: [
      { title: "The Last Unicorn", author: "Peter S. Beagle", numberInStock: 5 },
      { title: "Across the Nightingale Floor", numberInStock: 10, author: "Lian Hearn" },
      { title: "The Name of the Wind", numberInStock: 15, author: "Patrick Rothfuss" }
    ]
  },
  {
    name: "Fiction",
    books: [
      { title: "East of Eden", numberInStock: 5, author: "John Steinbeck" },
      { title: "The Elegance of the Hedgehog", numberInStock: 10, author: "Muriel Barbery" },
      { title: "The Master and Margarita", numberInStock: 15, author: "Mikhail Bulgakov" }
    ]
  },
  {
    name: "History",
    books: [
      { title: "A History of Venice", numberInStock: 5, author: "John Julius Norwich" },
      { title: "The Fall of Constantinople 1453", numberInStock: 10, author: "Steven Runciman" },
      { title: "The History of Basque", numberInStock: 15, author: "R.L. Trask" }
    ]
  },
  {
    name: "Nonfiction",
    books: [
      { title: "Homo Deus: A History of Tomorrow", numberInStock: 5, author: "Yuval Noah Harari" },
      { title: "The Gene: An Intimate History", numberInStock: 10, author: "Siddhartha Mukherjee" },
      { title: "Global Discontents", numberInStock: 15, author: "Noam Chomsky" }
    ]
  }
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Book.deleteMany({});
  await Genre.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const books = genre.books.map(book => ({
      ...books,
      genre: { _id: genreId, name: genre.name }
    }));
    await Book.insertMany(books);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
