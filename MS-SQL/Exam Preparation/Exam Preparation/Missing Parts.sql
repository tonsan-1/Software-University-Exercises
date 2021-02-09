SELECT p.PartId, p.Description,
	   SUM(pn.Quantity) AS Required,
	   SUM(p.StockQty) AS [In Stock] , 0 AS Ordered
FROM Jobs j
FULL JOIN Orders o ON j.JobId = o.JobId
	 JOIN PartsNeeded pn ON pn.JobId = j.JobId
	 JOIN Parts p ON p.PartId = pn.PartId
	 WHERE j.Status != 'Finished' AND o.Delivered IS NULL
	 GROUP BY p.PartId, p.Description
	 HAVING SUM(p.StockQty) < SUM(pn.Quantity)