require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql"
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connection established");
  })
  .catch(err => {
    console.error("Unable to connect:", err);
  });

const User = sequelize.define("user", {
  firstName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  lastName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

const Book = sequelize.define("book", {
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  author: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  genre: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

const BookNote = sequelize.define("book_note", {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

User.hasMany(Book);
Book.belongsTo(User);

Book.hasMany(BookNote);
BookNote.belongsTo(Book);

sequelize.sync();

module.exports = {
  User,
  Book,
  BookNote
};
