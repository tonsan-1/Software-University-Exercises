using System;
using System.Collections.Generic;
using System.Linq;

namespace _04.ListOperations
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
            while ((input = Console.ReadLine()) != "End")
            {
                var command = input.Split();
                if (command[0] == "Shift")
                {
                    var direction = command[1];
                    var count = int.Parse(command[2]);
                    if (direction == "left")
                    {
                        for (int i = 0; i < count; i++)
                        {
                            numbers.Add(numbers[0]);
                            numbers.RemoveAt(0);
                        }
                    }
                    if (direction == "right")
                    {
                        for (int i = 0; i < count; i++)
                        {
                            numbers.Insert(0, numbers[numbers.Count - 1]);
                            numbers.RemoveAt(numbers.Count - 1);
                        }
                    }
                }
                if (command[0] == "Add")
                {
                    int num = int.Parse(command[1]);
                    numbers.Add(num);
                }
                if (command[0] == "Remove")
                {
                    int index = int.Parse(command[1]);
                    if (index < 0 || index > numbers.Count)
                    {
                        Console.WriteLine("Invalid index");
                    }
                    else
                    {
                        numbers.RemoveAt(index);
                    }
                }
                if (command[0] == "Insert")
                {
                    int num = int.Parse(command[1]);
                    var index = int.Parse(command[2]);
                    if (index < 0 || index > numbers.Count)
                    {
                        Console.WriteLine("Invalid index");
                    }
                    else
                    {
                        numbers.Insert(index, num);
                    }
                }
            }
            Console.WriteLine(String.Join(" ", numbers));
        }
    }
}
