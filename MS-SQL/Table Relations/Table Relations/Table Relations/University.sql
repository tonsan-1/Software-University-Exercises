CREATE DATABASE University

CREATE TABLE Majors
(
	MajorID INT PRIMARY KEY,
	Name VARCHAR(50) NOT NULL
)
CREATE TABLE Students
(
	StudentID INT PRIMARY KEY,
	StudentNumber INT NOT NULL,
	StudentName NVARCHAR(100) NOT NULL,
	MajorID INT REFERENCES Majors(MajorID)
)
CREATE TABLE Subjects
(
	SubjectID INT PRIMARY KEY,
	SubjectName NVARCHAR(MAX)
)

CREATE TABLE Agenda
(
	StudentID INT REFERENCES Students(StudentID),
	SubjectID INT REFERENCES Subjects(SubjectID),
	PRIMARY KEY(StudentID, SubjectID)
)
CREATE TABLE Payments
(
	PaymentID INT PRIMARY KEY,
	PaymentDate Date NOT NULL,
	PaymentAmount DECIMAL(15,2) NOT NULL,
	StudentID INT REFERENCES Students(StudentID)
)