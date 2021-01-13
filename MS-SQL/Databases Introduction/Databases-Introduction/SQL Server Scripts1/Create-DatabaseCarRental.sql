CREATE DATABASE CarRental
USE CarRental

CREATE TABLE Categories
(
	Id INT PRIMARY KEY,
	CategoryName VARCHAR(50) NOT NULL,
	DailyRate DECIMAL(15,2) NOT NULL,
	WeeklyRate DECIMAL(15,2) NOT NULL,
	MonthlyRate DECIMAL(15,2) NOT NULL,
	WeekendRate DECIMAL(15,2) NOT NULL
)

INSERT INTO Categories VALUES
(1,'Jipki',0,0,0,0),
(2,'Jipki',0,0,0,0),
(3,'Jipki',0,0,0,0)

CREATE TABLE Cars
(
	Id INT PRIMARY KEY,
	PlateNumber VARCHAR(100) NOT NULL,
	Manufacturer VARCHAR(100) NOT NULL,
	Model VARCHAR(100) NOT NULL,
	CarYear INT NOT NULL,
	CategoryId INT NOT NULL,
	Doors INT NOT NULL,
	Picture VARCHAR(200),
	Condition VARCHAR(50) NOT NULL,
	Available BIT NOT NULL
)

INSERT INTO Cars VALUES 
(1,'KH5577BA', 'Lancia', 'Delta', 2002, 123, 4, NULL, 'mint', 1),
(2,'KH5577BA', 'Lancia', 'Delta', 2002, 123, 4, NULL, 'mint', 1),
(3,'KH5577BA', 'Lancia', 'Delta', 2002, 123, 4, NULL, 'mint', 1)

CREATE TABLE Employees
(
	Id INT PRIMARY KEY,
	FirstName VARCHAR(100) NOT NULL,
	LastName VARCHAR(100) NOT NULL,
	Title VARCHAR(100) NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO Employees VALUES
(1,'Gogo', 'Gogov', 'Kranist', NULL),
(2,'Gogo', 'Gogov', 'Kranist', NULL),
(3,'Gogo', 'Gogov', 'Kranist', NULL)

CREATE TABLE Customers
(
	Id INT PRIMARY KEY,
	DriverLicenceNumber INT NOT NULL,
	FullName VARCHAR(200) NOT NULL,
	[Address] VARCHAR(350) NOT NULL,
	City VARCHAR(100) NOT NULL,
	ZipCode VARCHAR(30) NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO Customers VALUES
(1,345345, 'Ivan Petrov', 'ul.Razmetanica','Dupnitsa','2600', NULL),
(2,345345, 'Ivan Petrov', 'ul.Razmetanica','Dupnitsa','2600', NULL),
(3,345345, 'Ivan Petrov', 'ul.Razmetanica','Dupnitsa','2600', NULL)

CREATE TABLE RentalOrders
(
	Id INT PRIMARY KEY,
	EmployeeId INT NOT NULL,
	CustomerId INT NOT NULL,
	CarId INT NOT NULL,
	TankLevel INT NOT NULL,
	KilometrageStart INT NOT NULL,
	KilometrageEnd INT NOT NULL,
	TotalKilometrage INT NOT NULL,
	StartDate DATETIME NOT NULL,
	EndDate DATETIME NOT NULL,
	TotalDays INT NOT NULL,
	RateApplied DECIMAL(15,2) NOT NULL,
	TaxRate DECIMAL(15,2) NOT NULL,
	OrderStatus BIT NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO RentalOrders VALUES
(1,123,321,44,25, 111,222,333, 1/4/2021, 11/4/2021, 365, 0,0, 1, NULL),
(2,123,321,44,25, 111,222,333, 1/4/2021, 11/4/2021, 365, 0,0, 1, NULL),
(3,123,321,44,25, 111,222,333, 1/4/2021, 11/4/2021, 365, 0,0, 1, NULL)


