using System;
using System.Linq;

namespace _05.BombNumbers
{
    class Program
    {
        static void Main(string[] args)
        {
            var numbers = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToList();
            var specialNumbers = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToList();
            var bombNumber = specialNumbers[0];
            var length = specialNumbers[1];
            for (int i = 0; i < numbers.Count; i++)
            {
                if (numbers[i] == bombNumber)
                {
                    int left = Math.Max(i - length, 0);
                    int right = Math.Min(i + length, numbers.Count - 1);

                    numbers.RemoveRange(i, right - i);
                    numbers.RemoveAt(i);
                    numbers.RemoveRange(left, i - left);
                    i = 0;
                }
            }
            Console.WriteLine(numbers.Sum());
        }
    }
}