using System;
using System.Collections.Generic;
using System.Linq;

namespace _08.ComapnyUsers
{
    class Program
    {
        static void Main(string[] args)
        {
            var companyUsers = new Dictionary<string, List<string>>();

            string input;
            while ((input = Console.ReadLine()) != "End")
            {
                var splitInput = input.Split(" -> ", StringSplitOptions.RemoveEmptyEntries).ToArray();
                var company = splitInput[0];
                var id = splitInput[1];

                if (!companyUsers.ContainsKey(company))
                {
                    companyUsers[company] = new List<string>();
                }

                if (!companyUsers[company].Contains(id))
                {
                    companyUsers[company].Add(id);
                }
            }

            foreach (var kvp in companyUsers.OrderBy(x => x.Key))
            {
                var company = kvp.Key;
                var id = kvp.Value;

                Console.WriteLine($"{company}");

                foreach (var valuePair in id)
                {
                    Console.WriteLine($"-- {valuePair}");
                }
            }
        }
    }
}