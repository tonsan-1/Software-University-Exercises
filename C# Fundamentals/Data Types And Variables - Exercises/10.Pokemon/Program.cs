using System;

namespace _10.Pokemon
{
    class Program
    {
        static void Main(string[] args)
        {
            long n = int.Parse(Console.ReadLine());
            long m = int.Parse(Console.ReadLine());
            long y = int.Parse(Console.ReadLine());
            var count = 0;
            var fiftyOfN = n * 0.5;

            while (n >= m)
            {
                if (n == fiftyOfN)
                {
                    if (y != 0)
                    {
                        n /= y;
                    }
                }
                if (n >= m)
                {
                    n -= m;
                    count++;
                }
            }
            Console.WriteLine(n);
            Console.WriteLine(count);
        }
    }
}
