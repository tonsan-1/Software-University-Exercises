using System;
using System.Collections.Generic;
using System.Linq;

namespace _02.ChangeList
{
    class Program
    {
        static void Main(string[] args)
        {
            List<int> numbers = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToList();

            string input;
            while ((input = Console.ReadLine()) != "end")
            {
                var command = input.Split();
                if (command[0] == "Delete")
                {
                    int num = int.Parse(command[1]);
                    numbers.RemoveAll(x => x == num);
                }
                if (command[0] == "Insert")
                {
                    int num = int.Parse(command[1]);
                    int index = int.Parse(command[2]);
                    numbers.Insert(index, num);
                }
            }
            Console.WriteLine(string.Join(" ", numbers));
        }
    }
}