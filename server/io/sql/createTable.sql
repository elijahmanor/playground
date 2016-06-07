
IF (NOT EXISTS (SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_name = 'arrrzero' ) )
BEGIN
	CREATE TABLE arrrzero (
		id VARCHAR(256),
		val VARCHAR(max)
	)
END
