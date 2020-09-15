using System;

namespace _01.SmallestOfThreeNumbers
{
    class Program
    {
        static void Main(string[] args)
        {
            int num1 = int.Parse(Console.ReadLine());
            int num2 = int.Parse(Console.ReadLine());
            int num3 = int.Parse(Console.ReadLine());
            PrintSmallestNumber(num1, num2, num3);
        }

        private static void PrintSmallestNumber(int num1, int num2, int num3)
        {
            var smallestOfTwo = Math.Min(num1, num2);
            var smallest = Math.Min(smallestOfTwo, num3);
            Console.WriteLine(smallest);
        }
    }
}