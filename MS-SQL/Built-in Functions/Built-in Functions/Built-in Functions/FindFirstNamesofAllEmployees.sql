SELECT FirstName 
  FROM Employees
 WHERE DepartmentID = 3 OR DepartmentID = 10 AND
	   FORMAT(HireDate,'yyyy') BETWEEN 1995 AND 2005