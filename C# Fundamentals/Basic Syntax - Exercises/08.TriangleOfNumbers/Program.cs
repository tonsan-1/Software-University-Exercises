using System;

namespace _08.TriangleOfNumbers
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());

            for (int row = 1; row <= n; row++)
            {
                for (int i = 1; i <= row; i++)
                {
                    Console.Write(row + " ");
                }
                Console.WriteLine();
            }

        }
    }
}
