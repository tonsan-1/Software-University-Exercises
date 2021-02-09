CREATE FUNCTION ufn_CashInUsersGames (@gameName VARCHAR(100))
RETURNS TABLE
AS
RETURN(
SELECT SUM(k.Cash) AS TotalCash
FROM(SELECT Cash, 
		ROW_Number() OVER (ORDER BY CASH DESC) AS RowNumber
FROM Games AS g
JOIN UsersGames AS ug ON ug.GameId = g.Id
WHERE Name = @gameName) as K
WHERE k.RowNumber % 2 = 1
)