using System;
using System.Collections.Generic;
using System.Linq;

namespace _10.SoftUniExamResults
{
    class Program
    {
        static void Main(string[] args)
        {
            var usernames = new Dictionary<string, int>();
            var languages = new Dictionary<string, int>();

            string input;
            while ((input = Console.ReadLine()) != "exam finished")
            {
                var splitInput = input.Split("-", StringSplitOptions.RemoveEmptyEntries).ToArray();

                if (splitInput[1] != "banned")
                {
                    var username = splitInput[0];
                    var language = splitInput[1];
                    var points = int.Parse(splitInput[2]);

                    if (!usernames.ContainsKey(username))
                    {
                        usernames[username] = points;
                    }
                    if (!languages.ContainsKey(language))
                    {
                        languages[language] = 0;
                    }
                    if (usernames.Values.Any(x => x < points))
                    {
                        usernames[username] = points;
                    }

                    languages[language]++;
                }
                else
                {
                    var username = splitInput[0];

                    if (usernames.ContainsKey(username))
                    {
                        usernames.Remove(username);
                    }
                }
            }

            Console.WriteLine($"Results:");
            foreach (var kvp in usernames.OrderByDescending(x => x.Value).ThenBy(x => x.Key))
            {
                var username = kvp.Key;
                var points = kvp.Value;

                Console.WriteLine($"{username} | {points}");
            }
            Console.WriteLine($"Submissions:");
            foreach (var ls in languages.OrderByDescending(x => x.Value).ThenBy(x => x.Key))
            {
                var language = ls.Key;
                var submissions = ls.Value;

                Console.WriteLine($"{language} - {submissions}");
            }
        }
    }
}
