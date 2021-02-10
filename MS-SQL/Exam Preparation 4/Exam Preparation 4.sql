--01.CREATE
CREATE DATABASE Bakery

CREATE TABLE Countries
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(50) UNIQUE NOT NULL,
)
CREATE TABLE Customers
(
	Id INT PRIMARY KEY IDENTITY,
	FirstName NVARCHAR(25) NOT NULL,
	LastName NVARCHAR(25) NOT NULL,
	Gender CHAR(1) CHECK(Gender = 'M' OR Gender = 'F') NOT NULL,
	Age INT NOT NULL,
	PhoneNumber VARCHAR(10) CHECK(LEN(PhoneNumber) = 10) NOT NULL,
	CountryId INT REFERENCES Countries(Id) NOT NULL
)
CREATE TABLE Products
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(25) UNIQUE NOT NULL,
	[Description] NVARCHAR(250),
	Recipe NVARCHAR(MAX) NOT NULL,
	Price DECIMAL(15,2) CHECK(Price > 0) NOT NULL
)
CREATE TABLE Feedbacks
(
	Id INT PRIMARY KEY IDENTITY,
	[Description] NVARCHAR(255),
	Rate DECIMAL(15,2) CHECK(Rate BETWEEN 0 AND 10) NOT NULL,
	ProductId INT REFERENCES Products(Id) NOT NULL,
	CustomerId INT REFERENCES Customers(Id) NOT NULL
)
CREATE TABLE Distributors
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(25) UNIQUE NOT NULL,
	AddressText NVARCHAR(30) NOT NULL,
	Summary NVARCHAR(200) NOT NULL,
	CountryId INT REFERENCES Countries(Id) NOT NULL
)
CREATE TABLE Ingredients
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(30) NOT NULL,
	[Description] NVARCHAR(200),
	OriginCountryId INT REFERENCES Countries(Id) NOT NULL,
	DistributorId INT REFERENCES Distributors(Id) NOT NULL
)
CREATE TABLE ProductsIngredients
(
	ProductId INT REFERENCES Products(Id) NOT NULL,
	IngredientId INT REFERENCES Ingredients(Id) NOT NULL,
	PRIMARY KEY(ProductId, IngredientId)
)

--02. Insert

INSERT INTO Distributors (Name, CountryId, AddressText, Summary) VALUES
('Deloitte & Touche',2,'6 Arch St #9757','Customizable neutral traveling'),
('Congress Title',13,'58 Hancock St','Customer loyalty'),
('Kitchen People',1,'3 E 31st St #77','Triple-buffered stable delivery'),
('General Color Co Inc',21,'6185 Bohn St #72','Focus group'),
('Beck Corporation',23,'21 E 64th Ave','Quality-focused 4th generation hardware')

INSERT INTO Customers (FirstName, LastName, Age, Gender, PhoneNumber, CountryId) VALUES
('Francoise','Rautenstrauch',15,'M','0195698399',5),
('Kendra','Loud',22,'F','0063631526',11),
('Lourdes','Bauswell',50,'M','0139037043',8),
('Hannah','Edmison',18,'F','0043343686',1),
('Tom','Loeza',31,'M','0144876096',23),
('Queenie','Kramarczyk',30,'F','0064215793',29),
('Hiu','Portaro',25,'M','0068277755',16),
('Josefa','Opitz',43,'F','0197887645',17)

--03. Update

UPDATE Ingredients
SET DistributorId = 35
WHERE [Name] IN('Bay Leaf', 'Paprika', 'Poppy')

UPDATE Ingredients
SET OriginCountryId = 14
WHERE OriginCountryId = 8

--04. Delete

DELETE 
FROM Feedbacks
WHERE CustomerId = 14 OR ProductId = 5

--05. Products By Price

SELECT Name, Price, Description
FROM Products
ORDER BY Price DESC, Name

--06. Negative Feedback

SELECT f.ProductId, f.Rate, f.Description, f.CustomerId, c.Age, c.Gender
FROM Feedbacks f
JOIN Customers c ON c.Id = f.CustomerId
WHERE f.Rate < 5.0
ORDER BY f.ProductId DESC, f.Rate

--07. Customers without Feedback

SELECT CONCAT(c.FirstName,' ',c.LastName) AS CustomerName,
	   c.PhoneNumber,
	   c.Gender
FROM Feedbacks f
RIGHT JOIN Customers c ON c.Id = f.CustomerId
WHERE f.Id IS NULL
ORDER BY c.Id

--08. Customers by Criteria

SELECT c.FirstName, c.Age, c.PhoneNumber
FROM Customers c
JOIN Countries cr ON cr.Id = c.CountryId
WHERE c.Age >= 21 AND
	  c.FirstName LIKE '%an%' OR
	  c.PhoneNumber LIKE '%38' AND
	  cr.Name != 'Greece'
ORDER BY c.FirstName, c.Age DESC

--09. Middle Range Distributors

SELECT DistributorName, IngredientName, ProductName, AVG
FROM (
SELECT D.Name AS DistributorName,
       I.Name AS IngredientName,
        P.Name AS ProductName,
        AVG(F.Rate) AS AVG
FROM Distributors AS D
JOIN Ingredients I on D.Id = I.DistributorId
JOIN ProductsIngredients PI on I.Id = PI.IngredientId
JOIN Products P on P.Id = PI.ProductId
JOIN Feedbacks F on P.Id = F.ProductId
GROUP BY D.Name, I.Name, P.Name) AS RANK
WHERE AVG BETWEEN 5.0 AND 8.0
ORDER BY DistributorName, IngredientName,ProductName

--10. Country Representative

select rankQuery.Name, rankQuery.DistributorName
from (
select c.Name, d.Name as DistributorName,
       dense_rank() over (partition by c.Name order by count(i.Id) desc) as rank
from Countries as c
      join  Distributors D on c.Id = D.CountryId
     left join Ingredients I on D.Id = I.DistributorId
group by  c.Name, d.Name
) as rankQuery
where rankQuery.rank=1
 ORDER BY rankQuery.Name, rankQuery.DistributorName

 select c.Name, d.Name as DistributorName,
       dense_rank() over (partition by c.Name order by count(i.Id) desc) as rank
from Countries as c
      join  Distributors D on c.Id = D.CountryId
     left join Ingredients I on D.Id = I.DistributorId
group by  c.Name, d.Name

