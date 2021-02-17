namespace ADO_NET
{
    using System;
    using System.Collections.Generic;
    using Microsoft.Data.SqlClient;
    class Program
    {
        const string SqlConnectionString = "Server=.;Database=MinionsDB;Integrated Security=true;";
        static void Main(string[] args)
        {
            using var connection = new SqlConnection(SqlConnectionString);
            connection.Open();

            var townName = Console.ReadLine();

            var updateTownNamesQuery = @"UPDATE Towns
                                         SET Name = UPPER(Name)
                                         WHERE CountryCode = (SELECT c.Id FROM Countries AS c WHERE c.Name = @countryName)";

            var selectTownNamesQuery = @"SELECT t.Name 
                                            FROM Towns as t
                                             Countries AS c ON c.Id = t.CountryCode
                                                WHERE c.Name = @countryName";

            using var updateCommand = new SqlCommand(updateTownNamesQuery, connection);
            updateCommand.Parameters.AddWithValue("@countryName", townName);
            var affectedRows = updateCommand.ExecuteNonQuery();

            if (affectedRows == 0)
            {
                Console.WriteLine("No town names were affected.");
            }
            else
            {
                Console.WriteLine($"{affectedRows} town name were affected.");

                using var selectCommand = new SqlCommand(selectTownNamesQuery, connection);
                selectCommand.Parameters.AddWithValue("@countryName", townName);

                using(var reader = selectCommand.ExecuteReader())
                {
                    var towns = new List<string>();

                    while (reader.Read())
                    {
                        towns.Add((string)reader[0]);
                    }
                    Console.WriteLine($"[{string.Join(", ",towns)}]");
                }
            }
        }

        private static void Problem4(SqlConnection connection)
        {
            var minionInfo = Console.ReadLine()
                            .Split(' ');

            var villainInfo = Console.ReadLine()
                .Split(' ');

            var minionName = minionInfo[1];
            var age = int.Parse(minionInfo[2]);
            var town = minionInfo[3];
            int? townId = GetTownId(connection, town);

            if (townId == null)
            {
                //create town, get id

                string createTownQuery = "INSERT INTO Towns (Name) VALUES (@name)";
                using var createTownSqlCommand = new SqlCommand(createTownQuery, connection);
                createTownSqlCommand.Parameters.AddWithValue("@name", town);

                createTownSqlCommand.ExecuteNonQuery();
                townId = GetTownId(connection, town);
                Console.WriteLine($"Town {town} was added to the database.");
            }

            string villainName = villainInfo[1];

            int? villainId = getVillainId(connection, villainName);

            if (villainId == null)
            {
                string createVillain = "INSERT INTO Villains (Name, EvilnessFactorId)  VALUES (@villainName, 4)";
                using var sqlCommand = new SqlCommand(createVillain, connection);
                sqlCommand.Parameters.AddWithValue("@villainName", villainName);
                sqlCommand.ExecuteNonQuery();
                villainId = getVillainId(connection, villainName);
                Console.WriteLine($"Villain {villainName} was added to the database.");
            }

            CreateMinion(connection, minionName, age, townId);
            var minionId = GetMinionId(connection, minionName);
            InsertMinionVillain(connection, villainId, minionId);

            Console.WriteLine($"Successfully added {minionName} to be minion of {villainName}.");
        }

        private static void InsertMinionVillain(SqlConnection connection, int? villainId, int? minionId)
        {
            var insertMinVilQuery = "INSERT INTO MinionsVillains (MinionId, VillainId) VALUES (@villainId, @minionId)";
            var sqlCommand = new SqlCommand(insertMinVilQuery, connection);
            sqlCommand.Parameters.AddWithValue("@villainId", minionId);
            sqlCommand.Parameters.AddWithValue("@minionId", villainId);
            sqlCommand.ExecuteNonQuery();
        }
        private static int? GetMinionId(SqlConnection connection, string minionName)
        {
            var minionIdQuery = "SELECT Id FROM Minions WHERE Name = @Name";
            using var searchMinionIdCommand = new SqlCommand(minionIdQuery, connection);
            searchMinionIdCommand.Parameters.AddWithValue("@Name", minionName);
            var minionID = searchMinionIdCommand.ExecuteScalar();
            return (int?)minionID;
        }
        private static void CreateMinion(SqlConnection connection, string minionName, int age, int? townId)
        {
            var createMinionQuery = "INSERT INTO Minions (Name, Age, TownId) VALUES (@name, @age, @townId)";
            using var createMinionSqlCommand = new SqlCommand(createMinionQuery, connection);
            createMinionSqlCommand.Parameters.AddWithValue("@name", minionName);
            createMinionSqlCommand.Parameters.AddWithValue("@age", age);
            createMinionSqlCommand.Parameters.AddWithValue("@townId", townId);
            createMinionSqlCommand.ExecuteNonQuery();
        }
        private static int? getVillainId(SqlConnection connection, string villainName)
        {
            var query = "SELECT Id FROM Villains WHERE Name = @Name";
            using var sqlCommand = new SqlCommand(query, connection);
            sqlCommand.Parameters.AddWithValue("@Name", villainName);
            var villainId = sqlCommand.ExecuteScalar();

            return (int?)villainId;

        }
        private static int? GetTownId(SqlConnection connection, string town)
        {
            var townIdQuery = "SELECT Id FROM Towns WHERE Name = @townName";
            using var searchTownSqlCommand = new SqlCommand(townIdQuery, connection);
            searchTownSqlCommand.Parameters.AddWithValue("@townName", town);
            var townId = searchTownSqlCommand.ExecuteScalar();
            return (int?)townId;
        }
        private static SqlCommand MinionNames(SqlConnection connection)
        {
            var id = int.Parse(Console.ReadLine());

            string villainNameQuery = "SELECT Name FROM Villains WHERE Id = @Id";
            var command = new SqlCommand(villainNameQuery, connection);
            command.Parameters.AddWithValue("@Id", id);
            var result = command.ExecuteScalar();

            string minionsQuery = @"SELECT ROW_NUMBER() OVER (ORDER BY m.Name) as RowNum,
                                         m.Name, 
                                         m.Age
                                    FROM MinionsVillains AS mv
                                    JOIN Minions As m ON mv.MinionId = m.Id
                                   WHERE mv.VillainId = @Id
                                ORDER BY m.Name";

            if (result == null)
            {
                Console.WriteLine($"No villain with ID {id} exists in the database.");
            }
            else
            {
                Console.WriteLine($"Villain: {result}");

                using (var minionCommand = new SqlCommand(minionsQuery, connection))
                {
                    minionCommand.Parameters.AddWithValue("@Id", id);

                    using (var reader = minionCommand.ExecuteReader())
                    {
                        if (!reader.HasRows)
                        {
                            Console.WriteLine("(no minions)");
                        }

                        while (reader.Read())
                        {
                            Console.WriteLine($"{reader[0]}. {reader[1]} {reader[2]}");
                        }
                    }
                }
            }

            return command;
        }
        private static void GetVillainNames(SqlConnection connection)
        {
            var query = @"SELECT Name, COUNT(mv.MinionId)
                          FROM Villains v
                          JOIN MinionsVillains mv ON mv.VillainId = v.Id
                          GROUP BY v.id, v.Name";

            using (var command = new SqlCommand(query, connection))
            {
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var name = reader[0];
                        var count = reader[1];

                        Console.WriteLine($"{name} - {count}");
                    }
                };
            };
        }
        private static void InitialSetup(SqlConnection connection)
        {
            string createDataBase = "CREATE DATABASE MinionsDB";
            var createTableStatements = GetCreateTableStatements();

            ExecuteNonQuery(connection, createDataBase);

            foreach (var query in createTableStatements)
            {
                ExecuteNonQuery(connection, query);
            }

            var insertStatements = GetInsertDataStatements();

            foreach (var query in insertStatements)
            {
                ExecuteNonQuery(connection, query);
            }
        }
        private static void ExecuteNonQuery(SqlConnection connection, string query)
        {
            using (var command = new SqlCommand(query, connection))
            {
                command.ExecuteNonQuery();
            };
        }
        private static string[] GetInsertDataStatements()
        {
            var result = new string[]
            {
                "INSERT INTO Countries (Name) VALUES ('Bulgaria'),('Norway'),('Cyprys'),('Greece'),('UK')",
                "INSERT INTO Towns(Name,CountryCode) VALUES ('Plovdiv', 1), ('Oslo', 2),('Larnaca', 3), ('Athens',4), ('London',5)",
                "INSERT INTO Minions (Name, Age, TownId) VALUES ('Stoyan',12,1), ('George', 22, 2),('Ivan', 25,3), ('Kiro',35,4), ('Niki', 25,5)",
                "INSERT INTO EvilnessFactors (Name) VALUES ('super good'), ('good'), ('bad'), ('evil'), ('super evil')",
                "INSERT INTO Villains (Name, EvilnessFactorId) VALUES ('Gru',1), ('Ivo',2),('Teo', 3),('Sto', 4), ('Pro', 5)",
                "INSERT INTO MinionsVillains VALUES (1,1), (2,2), (3,3), (4,4), (5,5)"
            };

            return result;
        }
        private static string[] GetCreateTableStatements()
        {
            var result = new string[]
            {
                "CREATE TABLE Countries(Id INT PRIMARY KEY IDENTITY,Name VARCHAR(50))",
                "CREATE TABLE Towns(Id INT PRIMARY KEY IDENTITY,Name VARCHAR(50),CountryCode INT REFERENCES Countries(Id))",
                "CREATE TABLE Minions(Id INT PRIMARY KEY IDENTITY,Name VARCHAR(50),Age INT,TownId INT REFERENCES Towns(Id))",
                "CREATE TABLE EvilnessFactors(Id INT PRIMARY KEY IDENTITY,Name VARCHAR(50))",
                "CREATE TABLE Villains(Id INT PRIMARY KEY IDENTITY,Name VARCHAR(50),EvilnessFactorId INT REFERENCES EvilnessFactors(Id))",
                "CREATE TABLE MinionsVillains(MinionId INT REFERENCES Minions(Id),VillainId INT REFERENCES Villains(Id),PRIMARY KEY(MinionId,VillainId))"
            };

            return result;
        }
    }
}
