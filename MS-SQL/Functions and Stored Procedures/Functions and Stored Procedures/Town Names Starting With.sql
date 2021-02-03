CREATE PROC usp_GetTownsStartingWith(@StartingLetter NVARCHAR(50))
AS
SELECT Name AS Town
FROM Towns
WHERE Name LIKE @StartingLetter + '%'

