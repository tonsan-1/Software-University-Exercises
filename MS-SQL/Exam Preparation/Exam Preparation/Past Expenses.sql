SELECT j.JobId, ISNULL(SUM(p.Price * op.Quantity), 0) AS TotalOrder
FROM Jobs AS j
LEFT JOIN Orders AS o ON o.JobId = j.JobId
LEFT JOIN OrderParts AS op ON o.OrderId = op.OrderId
LEFT JOIN Parts AS p ON p.PartId = op.PartId
WHERE Status = 'Finished'
GROUP BY j.JobId
ORDER BY TotalOrder DESC, j.JobId