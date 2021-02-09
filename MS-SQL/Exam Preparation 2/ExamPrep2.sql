--1.CREATE
CREATE TABLE Planets
(
	Id INT PRIMARY KEY IDENTITY,
	Name VARCHAR(30) NOT NULL
)
CREATE TABLE Spaceports
(
	Id INT PRIMARY KEY IDENTITY,
	Name VARCHAR(50) NOT NULL,
	PlanetId INT REFERENCES Planets(Id) NOT NULL
)
CREATE TABLE Spaceships
(
	Id INT PRIMARY KEY IDENTITY,
	Name VARCHAR(50) NOT NULL,
	Manufacturer VARCHAR(30) NOT NULL,
	LightSpeedRate INT DEFAULT 0
)
CREATE TABLE Colonists
(
	Id INT PRIMARY KEY IDENTITY,
	FirstName VARCHAR(20) NOT NULL,
	LastName VARCHAR(20) NOT NULL,
	Ucn VARCHAR(20) UNIQUE NOT NULL,
	BirthDate DATE NOT NULL
)
CREATE TABLE Journeys
(
	Id INT PRIMARY KEY IDENTITY,
	JourneyStart DATETIME NOT NULL,
	JourneyEnd DATETIME NOT NULL,
	Purpose VARCHAR(11) CHECK(Purpose IN ('Medical', 'Technical', 'Educational', 'Military')),
	DestinationSpaceportId INT REFERENCES Spaceports(Id) NOT NULL,
	SpaceshipId INT REFERENCES Spaceships(Id) NOT NULL
)
CREATE TABLE TravelCards
(
	Id INT PRIMARY KEY IDENTITY,
	CardNumber VARCHAR(10) UNIQUE NOT NULL CHECK(LEN(CardNumber) = 10),
	JobDuringJourney VARCHAR(8) CHECK(JobDuringJourney IN('Pilot', 'Engineer', 'Trooper', 'Cleaner', 'Cook')),
	ColonistId INT REFERENCES Colonists(Id) NOT NULL,
	JourneyId INT REFERENCES Journeys(Id) NOT NULL
)

--2.INSERT

INSERT INTO Planets VALUES
('Mars'),
('Earth'),
('Jupiter'),
('Saturn')

INSERT INTO Spaceships (Name, Manufacturer, LightSpeedRate) VALUES
('Golf','VW',3),
('WakaWaka','Wakanda',4),
('Falcon9','SpaceX',1),
('Bed','Vidolov',6)

--3.UPDATE

UPDATE Spaceships
SET LightSpeedRate += 1
WHERE Id BETWEEN 8 AND 12

--4.DELETE

DELETE
FROM TravelCards
WHERE JourneyId BETWEEN 1 AND 3

DELETE
FROM Journeys
WHERE Id BETWEEN 1 AND 3

--5.Select All Military Journeys

SELECT Id, 
	   FORMAT(JourneyStart,'dd/MM/yyyy') AS JourneyStart,
	   FORMAT(JourneyEnd,'dd/MM/yyyy') AS JourneyEnd
FROM Journeys j
WHERE Purpose = 'Military'
ORDER BY j.JourneyStart

--6.Select all pilots

SELECT c.Id, c.FirstName + ' ' + LastName AS full_name
FROM Colonists c
JOIN TravelCards tc ON tc.ColonistId = c.Id
WHERE tc.JobDuringJourney = 'Pilot'
ORDER BY c.id

--07. Count Colonists

SELECT COUNT(*) AS count
FROM Colonists c
JOIN TravelCards tc ON tc.ColonistId = c.Id
JOIN Journeys j ON j.Id = tc.JourneyId
WHERE j.Purpose = 'Technical'
GROUP BY j.Purpose

--08. Select Spaceships With Pilots

SELECT s.Name, s.Manufacturer
FROM Colonists c
JOIN TravelCards tc ON tc.ColonistId = c.Id
JOIN Journeys j ON j.Id = tc.JourneyId
JOIN Spaceships s ON s.Id = j.SpaceshipId
WHERE DATEDIFF(year,c.BirthDate, '01/01/2019') < 30 AND tc.JobDuringJourney = 'Pilot'
ORDER BY s.Name

--09. Planets And Journeys

SELECT p.Name AS PlanetName, 
	   COUNT(*) AS JourneysCount
FROM Journeys j
JOIN Spaceports sp ON sp.Id = j.DestinationSpaceportId
JOIN Planets p ON p.Id = sp.PlanetId
GROUP BY p.Name
ORDER BY JourneysCount DESC, p.Name

--10. Select Special Colonists

SELECT *
FROM (SELECT tc.JobDuringJourney,
	   c.FirstName + ' ' + c.LastName AS [FullName],
	   DENSE_Rank() OVER (PARTITION BY tc.JobDuringJourney ORDER BY c.BirthDate ASC) Rank
		FROM TravelCards tc
		JOIN Colonists c ON c.Id = tc.ColonistId) AS ranking
WHERE Rank = 2

--11. Get Colonists Count
GO

CREATE FUNCTION udf_GetColonistsCount(@planetName VARCHAR (30)) 
RETURNS int
AS
BEGIN
	DECLARE @result int
	SET @result = (SELECT COUNT(*) AS [Count]
				FROM Colonists c
				JOIN TravelCards tc ON tc.ColonistId = c.Id
				JOIN Journeys j ON j.Id = tc.JourneyId
				JOIN Spaceports sp ON sp.Id = j.DestinationSpaceportId
				JOIN Planets p ON p.Id = sp.PlanetId
				WHERE p.Name = @planetName
				GROUP BY p.Id)

	IF(@result IS NULL)
		RETURN 0

	RETURN @result
END

--12. Change Journey Purpose
GO
CREATE PROC usp_ChangeJourneyPurpose(@journeyId int, @newPurpose VARCHAR(11))
AS
BEGIN
	DECLARE @journey VARCHAR(max) = (SELECT Purpose FROM Journeys WHERE id = @journeyId)

	IF(@journey IS NULL)
		THROW 50001, 'The journey does not exist!',1
	IF(@journey = @newPurpose)
		THROW 50002, 'You cannot change the purpose!',1

	UPDATE Journeys
	SET Purpose = @newPurpose
	WHERE Id = @journeyId
END

EXEC usp_ChangeJourneyPurpose 4, 'Technical'

EXEC usp_ChangeJourneyPurpose 2, 'Educational'
EXEC usp_ChangeJourneyPurpose 196, 'Technical'				