CREATE TABLE Students
(
	StudentID INT PRIMARY KEY IDENTITY,
	Name NVARCHAR(100) NOT NULL
)
CREATE TABLE Exams
(
	ExamID INT PRIMARY KEY IDENTITY(101,1),
	Name NVARCHAR(60) NOT NULL
)
CREATE TABLE StudentsExams
(
	StudentID INT REFERENCES Students(StudentID),
	ExamID INT	REFERENCES Exams(ExamID),
	PRIMARY KEY (StudentID,ExamID) 
)

INSERT INTO Students VALUES
('Mila'),
('Toni'),
('Ron')

INSERT INTO Exams VALUES
('SpringMVC'),
('Neo4j'),
('Oracle 11g')