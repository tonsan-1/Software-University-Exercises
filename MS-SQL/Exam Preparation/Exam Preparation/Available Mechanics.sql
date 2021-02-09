SELECT m.FirstName + ' ' + m.LastName AS Mechanic
FROM Mechanics AS m
LEFT JOIN Jobs AS j ON j.MechanicId = m.MechanicId
WHERE j.JobId IS NULL OR (SELECT COUNT(JobId)
							FROM Jobs
							WHERE Status != 'Finished' AND MechanicId = m.MechanicId
							GROUP BY MechanicId, Status) IS NULL
GROUP BY m.MechanicId, (m.FirstName + ' ' + m.LastName)

