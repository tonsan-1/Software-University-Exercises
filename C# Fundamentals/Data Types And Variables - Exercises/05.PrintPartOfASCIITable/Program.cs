using System;

namespace _05.PrintPartOfASCIITable
{
    class Program
    {
        static void Main(string[] args)
        {
            var start = int.Parse(Console.ReadLine());
            var end = int.Parse(Console.ReadLine());
            int step = 1;
            int number = start;
            if (start > end)
            {
                int temp = start;
                start = end;
                end = temp;
                step = -1;
            }
            string result = "";
            for (int i = start; i <= end; i++)
            {
                result += (char)number + " ";
                number += step;
            }
            Console.WriteLine(result);

        }
    }
}