using System;
using System.Numerics;

namespace _11.Snowballs
{
    class Program
    {
        static void Main(string[] args)
        {
            BigInteger n = BigInteger.Parse(Console.ReadLine());
            BigInteger bestSnowValue = 0;
            BigInteger bestsnowballSnow = 0;
            BigInteger bestnowballTime = 0;
            BigInteger bestsnowballQuality = 0;

            for (BigInteger i = 0; i < n; i++)
            {
                BigInteger snowballSnow = BigInteger.Parse(Console.ReadLine());
                BigInteger snowballTime = BigInteger.Parse(Console.ReadLine());
                BigInteger snowballQuality = BigInteger.Parse(Console.ReadLine());
                BigInteger snowballValue = BigInteger.Pow((snowballSnow / snowballTime), (int)snowballQuality);
                if (snowballValue >= bestSnowValue)
                {
                    bestSnowValue = snowballValue;
                    bestsnowballSnow = snowballSnow;
                    bestnowballTime = snowballTime;
                    bestsnowballQuality = snowballQuality;
                }
            }
            Console.WriteLine($"{bestsnowballSnow} : {bestnowballTime} = {bestSnowValue} ({bestsnowballQuality})");
        }
    }
}
