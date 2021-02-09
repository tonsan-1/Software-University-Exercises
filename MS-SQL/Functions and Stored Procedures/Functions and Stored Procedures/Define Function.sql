CREATE FUNCTION ufn_IsWordComprised(@setOfLetters VARCHAR(MAX), @word VARCHAR(MAX))
RETURNS BIT
BEGIN
	DECLARE @count INT = 1;

	WHILE (@count <= LEN(@word))
	BEGIN
		DECLARE @currentLetter CHAR(1) = SUBSTRING(@word,@count,1)

		IF(CHARINDEX(@currentLetter, @setOfLetters) = 0)
		RETURN 0

		SET @count += 1;
END
RETURN 1
END

