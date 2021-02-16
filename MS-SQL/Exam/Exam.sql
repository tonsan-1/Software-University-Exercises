CREATE TABLE Users
(
	Id INT PRIMARY KEY IDENTITY,
	Username VARCHAR(30) NOT NULL,
	[Password] VARCHAR(30) NOT NULL,
	Email VARCHAR(50) NOT NULL
)
CREATE TABLE Repositories
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(50) NOT NULL
)
CREATE TABLE RepositoriesContributors
(
	RepositoryId INT REFERENCES Repositories(Id) NOT NULL,
	ContributorId INT REFERENCES Users(Id) NOT NULL
	PRIMARY KEY(RepositoryId, ContributorId)
)
CREATE TABLE Issues
(
	Id INT PRIMARY KEY IDENTITY,
	Title VARCHAR(255) NOT NULL,
	IssueStatus VARCHAR(6) NOT NULL,
	RepositoryId INT REFERENCES Repositories(Id) NOT NULL,
	AssigneeId INT REFERENCES Users(Id) NOT NULL
)
CREATE TABLE Commits
(
	Id INT PRIMARY KEY IDENTITY,
	[Message] VARCHAR(255) NOT NULL,
	IssueId INT REFERENCES Issues(Id),
	RepositoryId INT REFERENCES Repositories(Id) NOT NULL,
	ContributorId INT REFERENCES Users(Id) NOT NULL
)
CREATE TABLE Files
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(100) NOT NULL,
	Size DECIMAL(15,2) NOT NULL,
	ParentId INT REFERENCES Files(Id),
	CommitId INT REFERENCES Commits(Id) NOT NULL
)


--02.Insert

INSERT INTO Files ([Name],Size, ParentId, CommitId) VALUES
('Trade.idk', 2598.0,1,1),
('menu.net', 9238.31,2,2),
('Administrate.soshy', 1246.93,3,3),
('Controller.php', 7353.15,4,4),
('Find.java', 9957.86,5,5),
('Controller.json', 14034.87,3,6),
('Operate.xix', 7662.92,7,7)

INSERT INTO Issues (Title, IssueStatus, RepositoryId, AssigneeId) VALUES
('Critical Problem with HomeController.cs file','open',	1,4),
('Typo fix in Judge.html','open',4,3),
('Implement documentation for UsersService.cs',	'closed',8,	2),
('Unreachable code in Index.cs','open',9,8)

--03.Update

UPDATE Issues
SET IssueStatus = 'closed'
WHERE AssigneeId = 6

--04.Delete

DELETE
FROM RepositoriesContributors
WHERE RepositoryId = 
(SELECT ID FROM Repositories WHERE [Name] = 'Softuni-Teamwork')

DELETE
FROM Issues
WHERE RepositoryId = 
(SELECT ID FROM Repositories WHERE [Name] = 'Softuni-Teamwork')

--05. Commits

SELECT Id, [Message], RepositoryId, ContributorId
FROM Commits
ORDER BY Id, [Message], RepositoryId, ContributorId

--06. Front-end

SELECT Id, [Name], Size
FROM Files
WHERE Size > 1000 AND [Name] LIKE '%html%'
ORDER BY Size DESC, Id, [Name]

--07. Issue Assignment

SELECT i.Id,
	   CONCAT(u.Username, ' : ', i.Title) AS IssueAssignee
FROM Issues i
JOIN Users u ON u.Id = i.AssigneeId
ORDER BY i.Id DESC, IssueAssignee

--08. Single Files

SELECT Id, [Name], CONCAT(Size,'KB') AS Size
FROM Files
WHERE Id NOT IN (SELECT ParentId FROM Files WHERE ParentId IS NOT NULL)
ORDER BY Id, [Name], Size DESC


--09. Commits in Repositories

SELECT TOP(5) r.Id, r.Name, COUNT(*) AS Commits
FROM RepositoriesContributors rc
JOIN Repositories r ON r.Id = rc.RepositoryId
JOIN Commits c ON c.RepositoryId = r.Id
GROUP BY r.Id, r.Name
ORDER BY Commits DESC, r.Id, r.Name

--10. Average Size

SELECT u.Username, AVG(f.Size) AS Size
FROM Users u
JOIN Commits c ON c.ContributorId = u.Id
JOIN Files f ON f.CommitId = c.Id
GROUP BY u.Username
ORDER BY Size DESC, u.Username

--11. All User Commits
GO
CREATE FUNCTION udf_AllUserCommits(@username varchar(MAX))
RETURNS INT
AS
BEGIN
	DECLARE @count int = (SELECT COUNT(*)
					 FROM Users u
					 JOIN Commits c ON c.ContributorId = u.Id
					 WHERE u.Username = @username
					 GROUP BY u.Username)
	IF(@count IS NULL)
		RETURN 0;
	RETURN @count
END
GO

--12. Search for Files

CREATE PROC usp_SearchForFiles(@fileExtension varchar(max))
AS
BEGIN
	SELECT Id, Name, CONCAT(Size, 'KB') AS Size
	FROM Files
	WHERE (RIGHT(name,LEN(name) - CHARINDEX('.',name))) = @fileExtension
	ORDER BY Id, Name, Size DESC
END

EXEC usp_SearchForFiles 'txt'

