using System;
using System.Collections.Generic;

namespace _01.CountCharsInAString
{
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<char, uint> histogram = new Dictionary<char, uint>();

            string text = Console.ReadLine();

            for (int i = 0; i < text.Length; i++)
            {
                var currChar = text[i];

                if (currChar != ' ')
                {

                    if (!histogram.ContainsKey(currChar))
                    {
                        histogram[currChar] = 0;
                    }

                    histogram[currChar]++;
                }
            }

            foreach (var kvp in histogram)
            {
                Console.WriteLine($"{kvp.Key} -> {kvp.Value}");
            }
        }
    }
}
