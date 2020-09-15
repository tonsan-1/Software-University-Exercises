using System;

namespace _06.TriplesOfLatinLetters
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());

            for (int i = 0; i < n; i++)
            {
                for (int k = 0; k < n; k++)
                {
                    for (int d = 0; d < n; d++)
                    {
                        char firstChar = (char)('a' + i);
                        char secondChar = (char)('a' + k);
                        char thirdchar = (char)('a' + d);
                        Console.WriteLine("" + firstChar + secondChar + thirdchar);
                    }
                }
            }
        }
    }
}