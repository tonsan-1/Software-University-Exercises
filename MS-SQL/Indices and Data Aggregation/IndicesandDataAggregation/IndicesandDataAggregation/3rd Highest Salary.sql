SELECT DISTINCT Result.DepartmentID, Result.ThirdHighestSalary
FROM(SELECT DepartmentId, Salary AS ThirdHighestSalary,
	   DENSE_RANK() OVER(PARTITION BY DepartmentId ORDER BY Salary DESC) AS [Ranked]
FROM Employees) AS Result
WHERE Result.Ranked = 3