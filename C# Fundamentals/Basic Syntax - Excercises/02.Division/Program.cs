using System;

namespace _02.Division
{
    class Program
    {
        static void Main(string[] args)
        {
            var num = int.Parse(Console.ReadLine());
            var divisibleNumber = 0;

            if (num % 10 == 0)
            {
                divisibleNumber = 10;
            }
            else if (num % 7 == 0)
            {
                divisibleNumber = 7;
            }
            else if (num % 6 == 0)
            {
                divisibleNumber = 6;
            }
            else if (num % 3 == 0)
            {
                divisibleNumber = 3;
            }
            else if (num % 2 == 0)
            {
                divisibleNumber = 2;
            }

            if (divisibleNumber > 1)
            {
                Console.WriteLine($"The number is divisible by {divisibleNumber}");

            }
            else
            {
                Console.WriteLine("Not divisible");
            }
        }
    }
}