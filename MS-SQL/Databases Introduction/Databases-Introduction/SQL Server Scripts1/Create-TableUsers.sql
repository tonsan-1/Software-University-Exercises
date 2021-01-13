CREATE TABLE Users
(
	Id BIGINT PRIMARY KEY IDENTITY,
	Username VARCHAR(30) NOT NULL ,
	[Password] VARCHAR(30) NOT NULL,
	ProfilePicture VARCHAR(MAX),
	LastLoginTime DATETIME,
	IsDeleted BIT
)

INSERT INTO Users
(Username, [Password], ProfilePicture, LastLoginTime, IsDeleted)
VALUES
('stoShop', 'strongpass123','picture.png', '1/12/2021', 0),
('stoasdasShop', 'strongpass123123','picture.png', '1/30/2021', 0),
('stoSgdsfhop', 'strongpass12312312','picture.png', '4/23/2021', 0),
('stoSasdashop', 'strongpass123asdas','picture.png', '5/21/2021', 0),
('stoSasdaasdfsdfshop', 'strongpasssdf123asdas','picture.png', '5/21/2021', 0)