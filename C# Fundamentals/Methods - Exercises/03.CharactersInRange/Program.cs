using System;

namespace _03.CharactersInRange
{
    class Program
    {
        static void Main(string[] args)
        {
            var startChar = char.Parse(Console.ReadLine());
            var endChar = char.Parse(Console.ReadLine());
            PrintASCII(startChar, endChar);
        }

        private static void PrintASCII(char startChar, char endChar)
        {
            var startcharInInt = (int)startChar;
            var endcharInInt = (int)endChar;
            if (startcharInInt > endcharInInt)
            {
                var temp = endcharInInt;
                endcharInInt = startcharInInt;
                startcharInInt = temp;
            }
            for (int i = startcharInInt + 1; i < endcharInInt; i++)
            {
                var currChar = (char)i;
                Console.Write($"{currChar} ");
            }
            Console.WriteLine();
        }
    }
}