CREATE FUNCTION ufn_CalculateFutureValue (@sum DECIMAL(15,2), @interest FLOAT, @years INT)
RETURNS DECIMAL(15,4)
AS
BEGIN
	DECLARE @result DECIMAL(15,4)

SET @Result = (@sum * POWER((1 + @interest), @years))

RETURN @result;
END