using System;

namespace _09.SpiceMustFlow
{
    class Program
    {
        static void Main(string[] args)
        {
            uint startYield = uint.Parse(Console.ReadLine());
            var day = 0;
            uint minedSpice = 0;

            while (startYield >= 100)
            {
                day++;
                minedSpice += startYield;
                if (minedSpice > 26)
                {
                    minedSpice -= 26;
                }
                startYield -= 10;
            }
            if (minedSpice > 26)
            {
                minedSpice -= 26;
            }
            Console.WriteLine(day);
            Console.WriteLine(minedSpice);
        }
    }
}
