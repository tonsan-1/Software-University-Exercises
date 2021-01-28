SELECT TOP(5) c.CountryName, r.RiverName
FROM CountriesRivers AS cr
FULL JOIN Countries AS c ON cr.CountryCode = c.CountryCode
FULL JOIN Continents AS cn ON c.ContinentCode = cn.ContinentCode
FULL JOIN Rivers AS r ON cr.RiverId = r.Id
WHERE cn.ContinentCode = 'AF'
ORDER BY c.CountryName