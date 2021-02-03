CREATE OR ALTER PROC usp_GetHoldersWithBalanceHigherThan(@number DECIMAL(14,2))
AS
SELECT FirstName, LastName
FROM AccountHolders AS ah
JOIN Accounts AS ac ON ah.Id = ac.AccountHolderId
GROUP BY FirstName,LastName
HAVING SUM(Balance) > @number
ORDER BY ah.FirstName, ah.LastName