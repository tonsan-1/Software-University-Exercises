ALTER TABLE Users
DROP CONSTRAINT PK__Users__77222459CBC877D3

ALTER TABLE Users
ADD PRIMARY KEY (Id)

ALTER TABLE Users
ADD CONSTRAINT CH_UsernameIsMin3Symbols CHECK (LEN(Username) > 3)