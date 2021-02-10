--01.CREATE

CREATE TABLE Students
(
	Id INT PRIMARY KEY IDENTITY,
	FirstName NVARCHAR(30) NOT NULL,
	MiddleName NVARCHAR(25),
	LastName NVARCHAR(30) NOT NULL,
	Age INT CHECK(Age BETWEEN 5 AND 100) NOT NULL,
	[Address] NVARCHAR(50),
	Phone NVARCHAR(10) CHECK(LEN(Phone) = 10)
)
CREATE TABLE Subjects
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(20) NOT NULL,
	Lessons INT CHECK(Lessons > 0) NOT NULL
)
CREATE TABLE StudentsSubjects
(
	Id INT PRIMARY KEY IDENTITY,
	StudentId INT REFERENCES Students(Id) NOT NULL,
	SubjectId INT REFERENCES Subjects(Id) NOT NULL,
	Grade DECIMAL(15,2) CHECK(Grade BETWEEN 2.0 AND 6.0) NOT NULL
)
CREATE TABLE Exams
(
	Id INT PRIMARY KEY IDENTITY,
	[Date] DATETIME,
	SubjectId INT REFERENCES Subjects(Id) NOT NULL
)
CREATE TABLE StudentsExams
(
	StudentId INT REFERENCES Students(Id) NOT NULL,
	ExamId INT REFERENCES Exams(Id) NOT NULL,
	Grade DECIMAL(15,2) CHECK(Grade BETWEEN 2.0 AND 6.0) NOT NULL
	PRIMARY KEY(StudentId,ExamId)
)
CREATE TABLE Teachers
(
	Id INT PRIMARY KEY IDENTITY,
	FirstName NVARCHAR(20) NOT NULL,
	LastName NVARCHAR(20) NOT NULL,
	[Address] NVARCHAR(20) NOT NULL,
	Phone NVARCHAR(10) CHECK(LEN(Phone) = 10),
	SubjectId INT REFERENCES Subjects(Id) NOT NULL
)
CREATE TABLE StudentsTeachers
(
	StudentId INT REFERENCES Students(Id) NOT NULL,
	TeacherId INT REFERENCES Teachers(Id) NOT NULL
	PRIMARY KEY(StudentId, TeacherId)
)

--02. Insert

INSERT INTO Teachers (FirstName,LastName,Address,Phone,SubjectId) VALUES
('Ruthanne','Bamb','84948 Mesta Junction','3105500146',6),
('Gerrard','Lowin','370 Talisman Plaza','3324874824',2),
('Merrile','Lambdin','81 Dahle Plaza','4373065154',5),
('Bert','Ivie','2 Gateway Circle','4409584510',4)

INSERT INTO Subjects (Name,Lessons) VALUES
('Geometry',12),
('Health',10),
('Drama',7),
('Sports',9)

--03.UPDATE

UPDATE StudentsSubjects
SET Grade = 6.00
FROM StudentsSubjects
WHERE SubjectId IN(1,2) AND Grade >= 5.50

--04. Delete

DELETE
FROM StudentsTeachers 
WHERE TeacherId IN (SELECT id FROM Teachers WHERE Phone LIKE '%72%')

DELETE
FROM Teachers
WHERE Phone LIKE '%72%'

--05. Teen Students

SELECT FirstName, LastName, Age
FROM Students
WHERE Age >= 12
ORDER BY FirstName, LastName

--06. Students Teachers

SELECT s.FirstName,
	   s.LastName,
	   COUNT(*) AS TeachersCount
FROM Students s
JOIN StudentsTeachers st ON st.StudentId = s.Id
GROUP BY s.FirstName, s.LastName

--07. Students to Go

SELECT CONCAT(s.FirstName, ' ', s.LastName) AS [Full Name]
FROM Students s
LEFT JOIN StudentsExams se ON se.StudentId = s.Id
LEFT JOIN Exams e ON se.ExamId = e.Id
WHERE e.Id IS NULL
ORDER BY [Full Name]

--08. Top Students

SELECT TOP(10) s.FirstName,
	   s.LastName,
	   CONVERT(DECIMAL(10,2),AVG(se.Grade)) AS Grade
FROM Students s
LEFT JOIN StudentsExams se ON se.StudentId = s.Id
LEFT JOIN Exams e ON se.ExamId = e.Id
GROUP BY s.FirstName, s.LastName
ORDER BY Grade DESC, s.FirstName,s.LastName

--09. Not So In The Studying

SELECT 
CASE
	WHEN s.MiddleName IS NULL THEN s.FirstName + ' ' + s.LastName
	ELSE s.FirstName + ' ' + s.MiddleName + ' ' + s.LastName
END AS [Full Name]
FROM Subjects sb
RIGHT JOIN StudentsSubjects ss ON ss.SubjectId = sb.Id
RIGHT JOIN Students s ON s.Id = ss.StudentId
WHERE sb.Id IS NULL
ORDER BY [Full Name]

--10. Average Grade per Subject
SELECT r.Name, r.AverageGrade
FROM(
SELECT  s.Id,
		s.Name,
		AVG(ss.Grade) AS AverageGrade
FROM Subjects s
JOIN StudentsSubjects ss ON ss.SubjectId = s.Id
GROUP BY s.Name, s.Id) AS r
ORDER BY r.Id

--11. Exam Grades
GO
CREATE FUNCTION udf_ExamGradesToUpdate(@studentId int, @grade DECIMAL(15,2))
RETURNS varchar(max)
AS
BEGIN
		DECLARE @student int = (SELECT Id FROM Students WHERE Id = @studentId);

		IF(@student IS NULL)
			RETURN 'The student with provided id does not exist in the school!';

		IF(@grade > 6.00)
			RETURN 'Grade cannot be above 6.00!';

		DECLARE @countGrades int = (SELECT COUNT(*)
									FROM Students s
									JOIN StudentsExams se ON se.StudentId = s.Id
									WHERE se.Grade >= 5.50 AND se.Grade <= 5.50 + 0.50 AND s.Id = 12);

		DECLARE @firstName varchar(max) = (SELECT FirstName FROM Students WHERE Id = @studentId);

DECLARE @result varchar(max) = (SELECT CONCAT('You have to update ', @countGrades, ' grades for the student ',  @firstName));

RETURN @result
END
GO


