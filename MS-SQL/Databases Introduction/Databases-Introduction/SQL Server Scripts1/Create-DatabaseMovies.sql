CREATE DATABASE Movies
USE Movies

CREATE TABLE Directors
(
	Id INT PRIMARY KEY,
	DirectorName VARCHAR(100) NOT NULL,
	NOTES VARCHAR(MAX)
)

INSERT INTO Directors VALUES
(1,'Gosho Mishev', NULL),
(2,'Gosho Mishev', NULL),
(3,'Gosho Mishev', NULL),
(4,'Gosho Mishev', NULL),
(5,'Gosho Mishev', NULL)

CREATE TABLE Genres
(
	Id INT PRIMARY KEY,
	GenreName VARCHAR(100) NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO Genres VALUES
(1, 'komediya', NULL),
(2, 'komediya', NULL),
(3, 'komediya', NULL),
(4, 'komediya', NULL),
(5, 'komediya', NULL)

CREATE TABLE Categories
(
	Id INT PRIMARY KEY,
	CategoryName VARCHAR(70) NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO Categories VALUES
(1,'Funny',NULL),
(2,'Funny',NULL),
(3,'Funny',NULL),
(4,'Funny',NULL),
(5,'Funny',NULL)

CREATE TABLE Movies
(
	Id INT PRIMARY KEY,
	Title VARCHAR(50) NOT NULL,
	DirectorId INT NOT NULL,
	CopyrightYear INT NOT NULL,
	[Length] DECIMAL(15,2) NOT NULL,
	GenreId INT NOT NULL,
	CategoryId INT NOT NULL,
	Rating INT NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO Movies VALUES
(1,'Tarzan',12, 2007, 0, 123, 32, 4, NULL),
(2,'Tarzan',12, 2007, 0, 123, 32, 4, NULL),
(3,'Tarzan',12, 2007, 0, 123, 32, 4, NULL),
(4,'Tarzan',12, 2007, 0, 123, 32, 4, NULL),
(5,'Tarzan',12, 2007, 0, 123, 32, 4, NULL)