SELECT 
	CASE
	WHEN COUNT(c.CurrencyCode) > 1 THEN COUNT(c.CurrencyCode)
	ELSE COUNT(c.CurrencyCode)
	END AS CurrencyUsage
FROM Countries AS c
JOIN Continents AS cn ON c.ContinentCode = cn.ContinentCode
GROUP BY c.CurrencyCode

