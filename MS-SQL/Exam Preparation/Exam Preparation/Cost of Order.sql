CREATE FUNCTION udf_GetCost(@jobId INT)
RETURNS DECIMAL(15,2)
AS
BEGIN
DECLARE @result DECIMAL(15,2);

SET @result = (SELECT SUM(p.Price * op.Quantity)
			   FROM Jobs AS j
			   JOIN Orders AS o ON o.JobId = j.JobId
			   JOIN OrderParts AS op ON op.OrderId = o.OrderId
				JOIN Parts AS p ON p.PartId = op.PartId
				WHERE j.JobId = @jobId
				GROUP BY j.JobId)

IF (@result IS NULL)
SET @result = 0;

RETURN @result
END