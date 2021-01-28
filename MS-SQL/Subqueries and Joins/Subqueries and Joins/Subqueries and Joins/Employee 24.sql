SELECT e.EmployeeID, e.FirstName,
CASE
	WHEN DATEPART(YEAR,P.StartDate) >= 2005 THEN NULL
	ELSE P.Name
	END AS [ProjectName]
FROM Employees AS e
FULL JOIN EmployeesProjects AS ep ON e.EmployeeID = ep.EmployeeID
FULL JOIN Projects AS P ON ep.ProjectID = P.ProjectID
WHERE e.EmployeeID = 24


