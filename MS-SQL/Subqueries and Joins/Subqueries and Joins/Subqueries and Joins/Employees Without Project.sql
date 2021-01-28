SELECT TOP(3) e.EmployeeID, e.FirstName
FROM Employees AS e
LEFT JOIN EmployeesProjects AS ep ON e.EmployeeID = ep.EmployeeID
LEFT JOIN Projects AS P ON ep.ProjectID = P.ProjectID
WHERE ep.EmployeeID IS NULL
ORDER BY e.EmployeeID
