using System;

namespace _04.PrintAndSum
{
    class Program
    {
        static void Main(string[] args)
        {
            var numStart = int.Parse(Console.ReadLine());
            var numEnd = int.Parse(Console.ReadLine());
            var sum = 0;
            for (int i = numStart; i <= numEnd; i++)
            {
                sum += i;
                Console.Write(i + " ");
            }
            Console.WriteLine();
            Console.WriteLine($"Sum: {sum}");
        }
    }
}