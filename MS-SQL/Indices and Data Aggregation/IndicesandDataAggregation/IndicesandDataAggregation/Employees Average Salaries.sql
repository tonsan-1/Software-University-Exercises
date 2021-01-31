SELECT *
INTO NewSalaryTable
FROM Employees
WHERE Salary > 30000

DELETE FROM NewSalaryTable
WHERE ManagerID = 42

UPDATE NewSalaryTable
SET Salary += 5000
WHERE DepartmentID = 1

SELECT DepartmentID, AVG(Salary) AS AverageSalary
FROM NewSalaryTable
GROUP BY DepartmentID