using System;
using System.Collections.Generic;
using System.Linq;

namespace _09.ForceBook
{
    class Program
    {
        static void Main(string[] args)
        {
            var book = new Dictionary<string, List<string>>();

            string input;
            while ((input = Console.ReadLine()) != "Lumpawaroo")
            {
                var splitinput = input.Split(new string[] { " | ", " -> " }, StringSplitOptions.RemoveEmptyEntries).ToArray();

                if (input.Contains("|"))
                {
                    var side = splitinput[0];
                    var user = splitinput[1];

                    AddUserToSide(book, side, user);

                }
                else if (input.Contains("->"))
                {
                    string user = splitinput[0];
                    string side = splitinput[1];

                    MoveUserToSide(book, user, side);
                }

            }

            PrintOutput(book);
        }

        private static void PrintOutput(Dictionary<string, List<string>> book)
        {
            var orderedBook = book
                                .Where(kvp => kvp.Value.Count > 0)
                                .OrderByDescending(kvp => kvp.Value.Count)
                                .ThenBy(kvp => kvp.Key)
                                .ToDictionary(a => a.Key, b => b.Value);

            foreach (var sup in orderedBook)
            {
                string side = sup.Key;
                var sideUsers = sup.Value
                    .OrderBy(u => u)
                    .ToList();

                Console.WriteLine($"Side: {side}, Members: {sideUsers.Count}");

                foreach (var username in sideUsers)
                {
                    Console.WriteLine($"! {username}");
                }
            }
        }

        private static void MoveUserToSide(Dictionary<string, List<string>> book, string user, string side)
        {
            foreach (var kvp in book)
            {
                if (kvp.Value.Contains(user))
                {
                    kvp.Value.Remove(user);
                }
            }

            if (!book.ContainsKey(side))
            {
                book[side] = new List<string>();
            }

            book[side].Add(user);
            Console.WriteLine($"{user} joins the {side} side!");
        }

        private static void AddUserToSide(Dictionary<string, List<string>> book, string side, string user)
        {
            if (!book.ContainsKey(side))
            {
                book[side] = new List<string>();
            }
            if (!book.Values.Any(l => l.Contains(user)))
            {
                book[side].Add(user);
            }
        }
    }
}
