SELECT TOP(5) e.EmployeeID, e.FirstName, P.Name AS [ProjectName]
FROM Employees AS e
LEFT JOIN EmployeesProjects AS ep ON e.EmployeeID = ep.EmployeeID
LEFT JOIN Projects AS P ON ep.ProjectID = P.ProjectID
WHERE P.StartDate > CONVERT(smalldatetime,'2002-08-13', 101) AND P.EndDate IS NULL
ORDER BY e.EmployeeID
