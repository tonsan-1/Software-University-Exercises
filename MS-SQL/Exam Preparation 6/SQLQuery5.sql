--01.Number of Users for Email Provider

SELECT RIGHT(Email, LEN(Email) - CHARINDEX('@', email)) Domain ,
COUNT(Email) EmailCount
FROM   Users
WHERE  LEN(Email) > 0
GROUP BY RIGHT(Email, LEN(Email) - CHARINDEX('@', email))
ORDER BY EmailCount DESC, Domain

--02. All Users in Games

SELECT g.Name Game,
	   gt.Name [Game Type],
	   u.Username,
	   ug.Level,
	   ug.Cash,
	   c.Name Character
FROM Users u
JOIN UsersGames ug ON ug.UserId = u.Id
JOIN Characters c ON c.Id = ug.CharacterId
JOIN Games g ON g.Id = ug.GameId
JOIN GameTypes gt ON gt.Id = g.GameTypeId
ORDER BY ug.Level DESC, u.Username, g.Name

--03. Users in Games with Their Items

SELECT query.Username, query.Game, query.[Items Count], query.[Items Price]
FROM(
SELECT u.Username, g.Name Game, COUNT(i.Id) [Items Count], SUM(i.Price) [Items Price]
FROM Users u
JOIN UsersGames ug ON ug.UserId = u.Id
JOIN UserGameItems ugi ON ugi.UserGameId = ug.Id
JOIN Games g ON g.Id = ug.GameId
JOIN Items i ON i.Id = ugi.ItemId
GROUP BY u.Username, g.Name) AS query
WHERE [Items Count] >= 10
ORDER BY query.[Items Count] DESC, query.[Items Price] DESC, query.Username

--04. * User in Games with Their Statistics

SELECT *
FROM Users u
LEFT JOIN UsersGames ug ON ug.UserId = u.Id
LEFT JOIN Games g ON g.Id = ug.GameId
LEFT JOIN GameTypes gt ON gt.Id = g.GameTypeId
LEFT JOIN Characters c ON c.Id = ug.CharacterId
LEFT JOIN [Statistics] CharStats ON CharStats.Id = c.StatisticId
LEFT JOIN [Statistics] GameTypeStats ON GameTypeStats.Id = gt.BonusStatsId

--GROUP BY u.Username, g.Name, c.Name
ORDER BY u.FirstName


