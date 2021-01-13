ALTER TABLE Users
ADD CONSTRAINT CH_PasswordIsMin5Symbols CHECK (LEN([Password]) > 5)