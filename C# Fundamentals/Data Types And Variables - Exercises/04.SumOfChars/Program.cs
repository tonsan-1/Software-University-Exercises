using System;

namespace _04.SumOfChars
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            var sum = 0;
            for (int i = 0; i < n; i++)
            {
                char symbol = char.Parse(Console.ReadLine());
                sum += symbol;
            }
            Console.WriteLine($"The sum equals: {sum}");

        }
    }
}