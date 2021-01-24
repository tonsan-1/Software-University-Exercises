SELECT Username, SUBSTRING(Email,CHARINDEX('@',Email) + 1,120) AS [Email Provider]
FROM Users
ORDER BY [Email Provider],
		 Username