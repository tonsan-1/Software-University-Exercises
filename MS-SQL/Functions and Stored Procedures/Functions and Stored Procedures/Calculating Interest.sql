CREATE PROC usp_CalculateFutureValueForAccount (@accountID INT, @interestRate FLOAT)
AS
SELECT a.Id,
	   ah.FirstName, 
	   ah.LastName, 
	   a.Balance, 
	   dbo.ufn_CalculateFutureValue (a.Balance, @interestRate, 5)
FROM AccountHolders AS ah
JOIN Accounts AS a ON a.AccountHolderId = ah.Id
WHERE a.Id = @accountID