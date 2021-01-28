SELECT e.FirstName, e.LastName,e.HireDate, d.Name AS [DeptName]
FROM Employees AS e
JOIN Departments AS d ON e.DepartmentID = d.DepartmentID
WHERE YEAR(HireDate) > 1998 AND 
	  d.Name = 'Sales' OR d.Name = 'Finance'
ORDER BY e.HireDate