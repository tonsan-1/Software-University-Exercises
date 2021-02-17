--01.CREATE

CREATE TABLE Planes
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(30) NOT NULL,
	Seats INT NOT NULL,
	[Range] INT NOT NULL
)
CREATE TABLE Flights
(
	Id INT PRIMARY KEY IDENTITY,
	DepartureTime DATETIME,
	ArrivalTime DATETIME,
	Origin NVARCHAR(50) NOT NULL,
	Destination NVARCHAR(50) NOT NULL,
	PlaneId INT REFERENCES Planes(Id) NOT NULL
)
CREATE TABLE Passengers
(
	Id INT PRIMARY KEY IDENTITY,
	FirstName NVARCHAR(30) NOT NULL,
	LastName NVARCHAR(30) NOT NULL,
	Age INT NOT NULL,
	[Address] NVARCHAR(30) NOT NULL,
	PassportId CHAR(11) NOT NULL
)
CREATE TABLE LuggageTypes
(
	Id INT PRIMARY KEY IDENTITY,
	[Type] NVARCHAR(30) NOT NULL
)
CREATE TABLE Luggages
(
	Id INT PRIMARY KEY IDENTITY,
	LuggageTypeId INT REFERENCES LuggageTypes(Id) NOT NULL,
	PassengerId INT REFERENCES Passengers(Id) NOT NULL
)
CREATE TABLE Tickets
(
	Id INT PRIMARY KEY IDENTITY,
	PassengerId INT REFERENCES Passengers(Id) NOT NULL,
	FlightId INT REFERENCES Flights(Id) NOT NULL,
	LuggageId INT REFERENCES Luggages(Id) NOT NULL,
	Price DECIMAL(15,2) NOT NULL
)

--02. Insert

INSERT INTO Planes ([Name], Seats, [Range]) VALUES
('Airbus 336',112,5132),
('Airbus 330',432,5325),
('Boeing 369',231,2355),
('Stelt 297',254,2143),
('Boeing 338',165,5111),
('Airbus 558',387,1342),
('Boeing 128',345,5541)

INSERT INTO LuggageTypes VALUES
('Crossbody Bag'),
('School Backpack'),
('Shoulder Bag')

--03. Update

UPDATE Tickets
SET Price = Price + (Price * 0.13)
WHERE FlightId = (SELECT Id FROM Flights WHERE Destination = 'Carlsbad')

--04. Delete

DELETE
FROM Tickets
WHERE FlightId = (SELECT Id FROM Flights WHERE Destination = 'Ayn Halagim')

DELETE
FROM Flights
WHERE Destination = 'Ayn Halagim'

--05. The "Tr" Planes

SELECT Id, [Name], Seats, [Range]
FROM Planes
WHERE [Name] LIKE '%tr%'
ORDER BY Id, [Name], Seats,[Range]

--06. Flight Profits

SELECT f.Id, SUM(Price) AS Price
FROM Flights f
JOIN Tickets t ON t.FlightId = f.Id
GROUP BY f.Id
ORDER BY Price DESC, f.Id

--07. Passenger Trips

SELECT p.FirstName + ' ' + p.LastName AS [Full Name],
	   f.Origin,
	   f.Destination
FROM Passengers p
JOIN Tickets t ON t.PassengerId = p.Id
JOIN Flights f ON f.Id = t.FlightId
ORDER BY [Full Name], f.Origin, f.Destination

--08. Non Adventures People

SELECT p.FirstName, p.LastName, p.Age
FROM Passengers p
LEFT JOIN Tickets t ON t.PassengerId = p.Id
WHERE t.Id IS NULL
ORDER BY p.Age DESC, p.FirstName, p.LastName

--09.Full Info

SELECT p.FirstName + ' ' + p.LastName AS [Full Name],
	   pl.[Name] AS [Plane Name],
	   f.Origin + ' - ' + f.Destination AS [Trip],
	   lt.[Type] AS [Luggage Type]
FROM Passengers p
LEFT JOIN Tickets t ON t.PassengerId = p.Id
LEFT JOIN Luggages l ON l.Id = t.LuggageId
LEFT JOIN LuggageTypes lt ON lt.Id = l.LuggageTypeId
LEFT JOIN Flights f ON f.Id = t.FlightId
LEFT JOIN Planes pl ON pl.Id = f.PlaneId
WHERE f.Id IS NOT NULL
ORDER BY [Full Name], [Plane Name], f.Origin, f.Destination, [Luggage Type]

--10.PSP

SELECT pl.Name,pl.Seats,COUNT(p.Id) AS [Passengers Count]
FROM Planes pl
LEFT JOIN Flights f ON f.PlaneId = pl.Id
LEFT JOIN Tickets t ON t.FlightId = f.Id
LEFT JOIN Passengers p ON p.Id = t.PassengerId
GROUP BY pl.Name,pl.Seats
ORDER BY [Passengers Count] DESC, pl.Name, pl.Seats


--11. Vacation
GO
CREATE FUNCTION udf_CalculateTickets(@origin varchar(max), @destination varchar(max), @peopleCount int)
RETURNS varchar(max)
AS
BEGIN
		IF(@peopleCount <= 0)
			RETURN 'Invalid people count!'
		
		DECLARE @flight int = (SELECT Id FROM Flights WHERE Origin = @origin AND Destination = @destination)

		IF(@flight IS NULL)
			RETURN 'Invalid flight!'

		DECLARE @ticketPrice decimal(15,2) = (SELECT Price FROM Tickets WHERE FlightId = @flight)
		SELECT @ticketPrice = SUM(@ticketPrice * @peopleCount)

		DECLARE @result varchar(max) = CONCAT('Total price ', @ticketPrice)

RETURN @result

END

GO

--12. Wrong Data
GO
CREATE PROC usp_CancelFlights
AS
BEGIN
	UPDATE Flights
	SET DepartureTime = NULL, ArrivalTime = NULL
	WHERE ArrivalTime > DepartureTime
END

EXEC usp_CancelFlights
