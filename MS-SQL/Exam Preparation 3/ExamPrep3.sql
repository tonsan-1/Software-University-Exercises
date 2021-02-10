--01.CREATE

CREATE TABLE Cities
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(20) NOT NULL,
	CountryCode CHAR(2) NOT NULL
)
CREATE TABLE Hotels
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(30) NOT NULL,
	CityId INT REFERENCES Cities(Id) NOT NULL,
	EmployeeCount INT NOT NULL,
	BaseRate DECIMAL(15,2)
)
CREATE TABLE Rooms
(
	Id INT PRIMARY KEY IDENTITY,
	Price DECIMAL(15,2) NOT NULL,
	[Type] NVARCHAR(20) NOT NULL,
	Beds INT NOT NULL,
	HotelId INT REFERENCES Hotels(Id) NOT NULL
)
CREATE TABLE Trips
(
	Id INT PRIMARY KEY IDENTITY,
	RoomId INT REFERENCES Rooms(Id) NOT NULL,
	BookDate DATE NOT NULL,
	ArrivalDate DATE NOT NULL,
	ReturnDate DATE NOT NULL,
	CancelDate DATE,
	CHECK(BookDate < ArrivalDate),
	CHECK(ArrivalDate < ReturnDate)
)
CREATE TABLE Accounts
(
	Id INT PRIMARY KEY IDENTITY,
	FirstName NVARCHAR(50) NOT NULL,
	MiddleName NVARCHAR(20),
	LastName NVARCHAR(50) NOT NULL,
	CityId INT REFERENCES Cities(Id) NOT NULL,
	BirthDate DATE NOT NULL,
	Email VARCHAR(100) UNIQUE NOT NULL
)
CREATE TABLE AccountsTrips
(
	AccountId INT REFERENCES Accounts(Id) NOT NULL,
	TripId INT REFERENCES Trips(Id) NOT NULL,
	Luggage INT NOT NULL CHECK(Luggage >= 0)
	PRIMARY KEY (AccountId,TripId)
)
--02. Insert

INSERT INTO Accounts (FirstName, MiddleName, LastName, CityId, BirthDate, Email) VALUES
('John','Smith','Smith',34,'1975-07-21','j_smith@gmail.com'),
('Gosho',NULL,'Petrov',11,'1978-05-16','g_petrov@gmail.com'),
('Ivan','Petrovich','Pavlov',59,'1849-09-26','i_pavlov@softuni.bg'),
('Friedrich','Wilhelm','Nietzsche',2,'1844-10-15','f_nietzsche@softuni.bg')

INSERT INTO Trips (RoomId, BookDate, ArrivalDate, ReturnDate, CancelDate) VALUES
(101,'2015-04-12','2015-04-14','2015-04-20','2015-02-02'),
(102,'2015-07-07','2015-07-15','2015-07-22','2015-04-29'),
(103,'2013-07-17','2013-07-23','2013-07-24',NULL),
(104,'2012-03-17','2012-03-31','2012-04-01','2012-01-10'),
(109,'2017-08-07','2017-08-28','2017-08-29',NULL)

--03. Update

UPDATE Rooms
SET Price = Price + (Price *0.14)
WHERE HotelId IN(5,7,9)

--04. Delete

DELETE
FROM AccountsTrips
WHERE AccountId = 47

--05. EEE-Mails

SELECT FirstName,
	   LastName,
	   FORMAT(BirthDate,'MM-dd-yyyy') AS BirthDate,
	   c.Name AS Hometown,
	   a.Email
FROM Accounts a
JOIN Cities c on c.Id = a.CityId
WHERE Email LIKE 'e%'
ORDER BY c.Name

--06. City Statistics

SELECT c.Name AS City,
	   COUNT(*) AS Count
FROM Cities c
JOIN Hotels h ON h.CityId = c.Id
GROUP BY c.Id, c.Name
ORDER BY Count DESC, c.Name


--07. Longest and Shortest Trips

SELECT a.Id AS AccountId,
	   a.FirstName + ' ' + a.LastName AS FullName,
	   MAX(DATEDIFF(day,t.ArrivalDate,t.ReturnDate)) AS LongestTrip,
	   MIN(DATEDIFF(day,t.ArrivalDate,t.ReturnDate)) AS ShortestTrip
FROM AccountsTrips act
JOIN Accounts a on a.Id = act.AccountId
JOIN Trips t on t.Id = act.TripId
WHERE a.MiddleName IS NULL AND t.CancelDate IS NULL
GROUP BY a.Id, a.FirstName + ' ' + a.LastName
ORDER BY LongestTrip DESC, ShortestTrip

--08. Metropolis

SELECT TOP(10) c.Id,
	   c.Name AS City,
	   c.CountryCode,
	   COUNT(*) AS Accounts
FROM Cities c
JOIN Accounts a ON a.CityId = c.Id
GROUP BY c.Name,c.CountryCode, c.Id
ORDER BY Accounts DESC

--09. Romantic Getaways
SELECT a.Id,
	   a.Email,
	   c.Name AS City,
	   COUNT(*) AS Trips
FROM Accounts a
JOIN AccountsTrips act ON act.AccountId = a.Id
JOIN Trips t ON t.Id = act.TripId
JOIN Rooms r ON r.Id = t.RoomId
JOIN Hotels h ON h.Id = r.HotelId
JOIN Cities c ON c.Id = h.CityId
WHERE a.CityId = h.CityId
GROUP BY a.Id, a.Email, c.Name
ORDER BY Trips DESC, a.Id


--10. GDPR Violation

SELECT t.Id,
	   CASE
			WHEN a.MiddleName IS NULL THEN a.FirstName + ' ' + a.LastName
			ELSE a.FirstName + ' ' + a.MiddleName + ' ' + a.LastName
	   END AS [Full Name],
	   [From] = (SELECT Name FROM Cities c WHERE c.Id = a.CityId),
	   c.Name AS [To],
	   CASE
			WHEN t.CancelDate IS NOT NULL THEN CONVERT(varchar, 'Canceled')
			ELSE CONVERT(varchar,DATEDIFF(day, t.ArrivalDate, t.ReturnDate)) + ' ' + 'days' 
	   END AS Duration
FROM Accounts a
JOIN AccountsTrips act ON act.AccountId = a.Id
JOIN Trips t ON t.Id = act.TripId
JOIN Rooms r ON r.Id = t.RoomId
JOIN Hotels h ON h.Id = r.HotelId
JOIN Cities c ON c.Id = h.CityId
ORDER BY [Full Name], t.Id

--11. Available Room
GO
CREATE FUNCTION udf_GetAvailableRoom(@hotelId int, @date date, @people int)
RETURNS varchar(max)
AS
BEGIN
		DECLARE @hotels TABLE (Id INT);
		INSERT INTO @hotels(Id)
		SELECT DISTINCT r.Id
		FROM Rooms r
		JOIN Trips t ON t.RoomId = r.Id
		WHERE r.HotelId = @hotelId AND
			  @date BETWEEN t.ArrivalDate AND t.ReturnDate AND t.CancelDate IS NULL

		DECLARE @room TABLE(Id int, Price decimal(15,2), [Type] varchar(20), Beds int, TotalPrice decimal(15,2))
		INSERT INTO @room
			SELECT TOP(1) r.Id, r.Price, r.[Type], r.Beds, ((h.BaseRate + r.Price) * @people) AS TotalPrice
			FROM Rooms r
			LEFT JOIN Hotels h ON h.Id = r.HotelId
			WHERE r.HotelId = @hotelId AND r.Beds >= @people
			ORDER BY TotalPrice DESC

		IF((SELECT COUNT(*) FROM @room) < 1)
		RETURN 'No rooms available'


DECLARE @result varchar(max) =  (SELECT TOP(1)CONCAT('Room ', Id, ': ', Type, ' (',Beds, ' beds',')', ' - ', '$', TotalPrice ) FROM @room)
RETURN @result
END
GO
--12. Switch Room
GO
CREATE PROC usp_SwitchRoom(@tripId int, @targetRoomId int)
AS
BEGIN
	DECLARE @tripHotelId int = (SELECT r.HotelId FROM Trips t
								JOIN Rooms r ON r.Id = t.RoomId
								WHERE t.Id = @tripId)

	DECLARE @targetRoomHotelId int = (SELECT HotelId FROM Rooms WHERE Id = @targetRoomId)

	IF(@tripHotelId != @targetRoomHotelId)
		THROW 50001, 'Target room is in another hotel!', 1

	DECLARE @people int = (SELECT COUNT(*)
						   FROM AccountsTrips
						   WHERE TripId = @tripId)

	DECLARE @targetRoomBeds int = (SELECT Beds FROM Rooms WHERE Id = @targetRoomId)

	IF(@targetRoomBeds < @people)
		THROW 50002, 'Not enough beds in target room!', 1

	
	UPDATE Trips
	SET	RoomId = @targetRoomId
	WHERE Id = @tripId
END


