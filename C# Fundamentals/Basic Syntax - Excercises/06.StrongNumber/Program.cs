using System;

namespace _06.StrongNumber
{
    class Program
    {
        static void Main(string[] args)
        {

            var input = int.Parse(Console.ReadLine());
            var number = input;
            var sum = 0;
            var fact = 0;

            while (number > 0)
            {
                fact = number;
                fact = fact % 10;
                for (int i = fact - 1; i >= 1; i--)
                {
                    fact = fact * i;
                }
                sum += fact;
                number = number / 10;
            }
            if (sum == input) // if num is strong
            {
                Console.WriteLine("yes");
            }
            else
            {
                Console.WriteLine("no"); // if num is not strong
            }
        }
    }
}