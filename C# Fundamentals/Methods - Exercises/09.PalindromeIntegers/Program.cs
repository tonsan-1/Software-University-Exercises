using System;

namespace _09.PalindromeIntegers
{
    class Program
    {
        static void Main(string[] args)
        {
            CheckIfNumIsPalindrome();
        }
        static void CheckIfNumIsPalindrome()
        {
            while (true)
            {
                var input = Console.ReadLine();
                if (input == "END")
                {
                    return;
                }
                if (GetReversedString(input) == input)
                {
                    Console.WriteLine("true");
                }
                else
                {
                    Console.WriteLine("false");
                }
            }
        }
        static string GetReversedString(string command)
        {
            char[] charrArray = command.ToCharArray();
            Array.Reverse(charrArray);
            return new string(charrArray);
        }
    }
}
