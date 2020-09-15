using System;

namespace _02.VowelsCount
{
    class Program
    {
        static void Main(string[] args)
        {
            string input = Console.ReadLine().ToLower();
            char[] letters = input.ToCharArray();
            char[] vowels = { 'a', 'e', 'o', 'u', 'i' };
            PrintVowelsCount(letters, vowels);
        }

        private static void PrintVowelsCount(char[] letters, char[] vowels)
        {
            var count = 0;
            foreach (var vowel in vowels)
            {
                foreach (var letter in letters)
                {
                    if (letter == vowel)
                    {
                        count++;
                    }
                }
            }
            Console.WriteLine(count);
        }
    }
}