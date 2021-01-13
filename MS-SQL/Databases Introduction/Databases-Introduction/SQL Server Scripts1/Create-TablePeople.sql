CREATE TABLE People
(
	Id INT PRIMARY KEY,
	[Name] NVARCHAR(200) NOT NULL,
	Picture VARCHAR(MAX),
	Height DECIMAL(15,2),
	[Weight] DECIMAL(15,2),
	Gender VARCHAR(1) NOT NULL,
	Birthdate DATETIME NOT NULL,
	Biography VARCHAR(MAX)
)

INSERT INTO People VALUES
(1,'Ivan Genov', NULL, 0, 0,'m',1/15/1983,NULL),
(2,'Ivan Genov', NULL, 0, 0,'m',1/15/1983,NULL),
(3,'Ivan Genov', NULL, 0, 0,'m',1/15/1983,NULL),
(4,'Ivan Genov', NULL, 0, 0,'m',1/15/1983,NULL),
(5,'Ivan Genov', NULL, 0, 0,'m',1/15/1983,NULL)