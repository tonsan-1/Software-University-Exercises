SELECT c.FirstName + ' ' + c.LastName AS Client,
	   DATEDIFF(DAY, j.IssueDate, '04/24/2017') AS TimeLength,
	   j.Status

FROM Jobs AS j
JOIN Clients AS c ON j.ClientId = c.ClientId
WHERE j.Status != 'Finished'
ORDER BY TimeLength DESC, c.ClientId