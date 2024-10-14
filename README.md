# WEBDEV-Activity

Sandialan, Virlyn

Express API with CRUD Operations

Overview This project is an Express API that manages a movie database. It allows users to perform basic CRUD (Create, Read, Update, Delete) operations on a collection of movies. Each movie has the following properties:

id (auto-generated, number) title (string, required) director (string, required) year (number, required) genre (string, required) The API is connected to a MySQL database for data persistence.

API Endpoints

Get all movies Route: GET /movies Description: Returns a list of all movies in the collection. Response: [ { "id": 1, "title": "The Godfather", "director": "Francis Ford Coppola", "year": 1972, "genre": "Crime" }, ... ]
2. Get a movie by ID
Route: GET /movies/:id
Description: Returns a single movie by its ID.
Response:
{ "id": 1, "title": "The Godfather", "director": "Francis Ford Coppola", "year": 1972, "genre": "Crime" }

3. Create a new movie
Route: POST /movies
Description: Creates a new movie in the collection.
Request Body:
{ "title": "The Dark Knight", "director": "Christopher Nolan", "year": 2008, "genre": "Action" }

Response:
{ "message": "Movie added successfully", "movie": { "id": 2, "title": "The Dark Knight", "director": "Christopher Nolan", "year": 2008, "genre": "Action" } }

4. Update a movie by ID
Route: PUT /movies/:id
Description: Updates an existing movie by its ID.
Request Body:
{ "title": "Inception", "director": "Christopher Nolan", "year": 2010, "genre": "Sci-Fi/Thriller" }

Response:
{ "message": "Movie updated successfully" }

5. Delete a movie by ID
Route: DELETE /movies/:id
Description: Deletes a movie by its ID.
Response:
{ "message": "Movie deleted successfully" }

Installation
Clone the repository:
git clone cd Express-API-CRUD-Op

Initialize npm and install dependencies:
npm init -y npm install express mysql2 body-parser

Create the MySQL database and populate it with sample data:
CREATE DATABASE movie_db; USE movie_db;

CREATE TABLE movies ( id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, director VARCHAR(255) NOT NULL, year INT NOT NULL, genre VARCHAR(100) NOT NULL );

INSERT INTO movies (title, director, year, genre) VALUES ('The Silence of the Lambs', 'Jonathan Dimme', 1991, 'Thriller');

INSERT INTO movies (title, director, year, genre) VALUES ('The Dark Knight', 'Christopher Nolan', 2008, 'Action');

INSERT INTO movies (title, director, year, genre) VALUES ('Inception', 'Christopher Nolan', 2010, 'Sci-Fi');

INSERT INTO movies (title, director, year, genre) VALUES ('The Godfather', 'Francis Ford Coppola', 1972, 'Crime');

INSERT INTO movies (title, director, year, genre) VALUES ('Pulp Fiction', 'Quentin Tarantino', 1994, 'Crime');

Start the server:
node index.js

Your server should now be running on http://localhost:8080.

Usage with Insomnia
You can test the API using Insomnia by performing the following operations:

GET /movies: Retrieve all movies.
GET /movies/{id}: Retrieve a movie by its ID.
POST /movies: Create a new movie (provide a JSON body with movie data).
PUT /movies/{id}: Update a movie by its ID (provide a JSON body with updated data).
DELETE /movies/{id}: Delete a movie by its ID.
Error Handling
404 Not Found: If a movie is not found by its ID.
400 Bad Request: If required fields are missing when creating or updating a movie.
Conclusion
This project provides an easy-to-use API for managing a movie collection with the capability to create, read, update, and delete movies. The API is built with Node.js, Express, and MySQL, and it includes basic validation and error handling.