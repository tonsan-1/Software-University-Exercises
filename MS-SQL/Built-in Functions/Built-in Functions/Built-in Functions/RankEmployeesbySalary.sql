WITH SecondRanksOnly AS
(
SELECT *, 
	   DENSE_RANK() OVER (PARTITION BY Salary ORDER BY EmployeeID ASC) AS Rank
FROM Employees
)
SELECT EmployeeID,
	   FirstName,
	   LastName,
	   Salary,
	   Rank
FROM SecondRanksOnly
WHERE Salary BETWEEN 10000 AND 50000 AND Rank = 2
ORDER BY Salary DESC