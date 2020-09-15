using System;

namespace _06.MiddleCharacters
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(MiddleChars(Console.ReadLine()));
        }
        static string MiddleChars(string input)
        {
            if (input.Length % 2 == 0 && input.Length >= 3)
            {
                return input.Substring(input.Length / 2 - 1, 2);
            }
            else
            {
                return input.Substring(input.Length / 2, 1);
            }
        }
    }
}
