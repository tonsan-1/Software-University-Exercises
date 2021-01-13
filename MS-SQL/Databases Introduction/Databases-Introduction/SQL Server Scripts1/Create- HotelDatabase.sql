CREATE DATABASE Hotel
USE Hotel

CREATE TABLE Employees
(
	Id INT PRIMARY KEY,
	FirstName VARCHAR(90) NOT NULL,
	LastName VARCHAR(90) NOT NULL,
	Title VARCHAR(50) NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO Employees (Id,FirstName,LastName,Title,Notes)
VALUES
(1,'Gosho','Goshev', 'CEO', NULL),
(2,'Ivan','Goshev', 'CTO', NULL),
(3,'Petkan','Goshev', 'CPO', NULL)

CREATE TABLE Customers
(
	AccountNumber INT PRIMARY KEY,
	FirstName VARCHAR(90) NOT NULL,
	LastName VARCHAR(90) NOT NULL,
	PhoneNumber CHAR(10) NOT NULL,
	EmergencyName VARCHAR(90) NOT NULL,
	EmergencyNumber CHAR(10) NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO Customers(AccountNumber,FirstName,LastName,PhoneNumber,EmergencyName,EmergencyNumber,Notes)
VALUES
(1,'Gosho','Goshev', '1234567890', 'Ivan' , '1234567890', NULL),
(2,'Gosho','Goshev', '1234567890', 'Ivan' , '1234567890', NULL),
(3,'Gosho','Goshev', '1234567890', 'Ivan' , '1234567890', NULL)

CREATE TABLE RoomStatus
(
	RoomStatus BIT NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO RoomStatus (RoomStatus,Notes)
VALUES
(1,NULL),
(0,NULL),
(1,NULL)


CREATE TABLE RoomTypes
(
	RoomType VARCHAR(20) NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO RoomTypes(RoomType,Notes)
VALUES
('Occupied',NULL),
('Free',NULL),
('Free',NULL)

CREATE TABLE BedTypes 
(
	BedType VARCHAR(20) NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO BedTypes (BedType,Notes)
VALUES
('One-Bed', Null),
('Two-Beds', Null),
('No-Bed', Null)

CREATE TABLE Rooms
(
	RoomNumber INT PRIMARY KEY,
	RoomType VARCHAR(20) NOT NULL,
	BedType VARCHAR(20) NOT NULL,
	Rate INT,
	RoomStatus BIT NOT NULL,
	Notes VARCHAR(MAX)
)

INSERT INTO Rooms(RoomNumber,RoomType,BedType,Rate,RoomStatus,Notes)
VALUES
(1,'Apartment','One-Bed', 0, 0,Null),
(2,'Apartment','One-Bed', 0, 0,Null),
(3,'Apartment','One-Bed', 0, 0,Null)


CREATE TABLE Payments
(
	Id INT PRIMARY KEY,
	EmployeeId INT NOT NULL,
	PaymentDate DATETIME NOT NULL,
	AccountNumber INT NOT NULL,
	FirstDateOccupied DATETIME NOT NULL,
	LastDateOccupied DATETIME NOT NULL,
	TotalDays INT NOT NULL,
	AmountCharged DECIMAL(15,2) NOT NULL,
	TaxRate INT,
	TaxAmount INT,
	PaymentTotal DECIMAL(15,2),
	Notes VARCHAR(MAX)
)

INSERT INTO Payments(Id, EmployeeId, PaymentDate,AccountNumber,FirstDateOccupied,LastDateOccupied,TotalDays,AmountCharged,TaxRate,TaxAmount,PaymentTotal,Notes)
VALUES
(1,2323, 2/15/2021, 332, 3/1/2009, 3/23/2013, 333, 2344, 0, 0, 0, NULL),
(2,2323, 2/15/2021, 332, 3/1/2009, 3/23/2013, 333, 2344, 0, 0, 0, NULL),
(3,2323, 2/15/2021, 332, 3/1/2009, 3/23/2013, 333, 2344, 0, 0, 0, NULL)


CREATE TABLE Occupancies
(
	Id INT PRIMARY KEY,
	EmployeeID INT NOT NULL ,
	DateOccupied DATETIME NOT NULL,
	AccountNumber INT NOT NULL,
	RoomNumber INT NOT NULL,
	RateApplied INT,
	PhoneCharge DECIMAL(15,2),
	Notes VARCHAR(MAX)
)

INSERT INTO Occupancies(Id,EmployeeID,DateOccupied,AccountNumber,RoomNumber,RateApplied,PhoneCharge,Notes)
VALUES
(1,232, 4/21/2015, 3223, 3, 0, 0, NULL),
(2,232, 4/21/2015, 3223, 3, 0, 0, NULL),
(3,232, 4/21/2015, 3223, 3, 0, 0, NULL)