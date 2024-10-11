const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

app.use(bodyParser.json());

// MySQL database connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sandialanmysql", // Ilisi kini sa imong actual MySQL password
  database: "movieDB",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

// CRUD (Create, Read, Update, Delete) Operations

// 1. Get all movies
app.get("/movies", (req, res) => {
  const sql = "SELECT * FROM movies";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// 2. Get a single movie by ID
app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM movies WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).send({ message: "Movie not found" });
    }
    res.json(results[0]);
  });
});

// 3. Create a new movie
app.post("/movies", (req, res) => {
  const { title, director, year, genre } = req.body;

  // Validation
  if (!title || !director || !year || !genre) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO movies (title, director, year, genre) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, director, year, genre], (err, results) => {
    if (err) throw err;
    res.status(201).send({ id: results.insertId, ...req.body });
  });
});

// 4. Update an existing movie by ID
app.put("/movies/:id", (req, res) => {
  const { id } = req.params;
  const { title, director, year, genre } = req.body;

  // Validation
  if (!title || !director || !year || !genre) {
    return res.status(400).send({
      message: "All fields (title, director, year, genre) are required",
    });
  }

  const sql =
    "UPDATE movies SET title = ?, director = ?, year = ?, genre = ? WHERE id = ?";
  db.query(sql, [title, director, year, genre, id], (err, results) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Error updating movie", error: err });

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: "Movie not found" });
    }

    const updatedMovie = { id, title, director, year, genre };
    res.send({ message: "Movie updated successfully", updatedMovie });
  });
});

// 5. Delete a movie by ID
app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM movies WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: "Movie not found" });
    }
    res.send({ message: "Movie deleted successfully" });
  });
});

// Server startup
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
