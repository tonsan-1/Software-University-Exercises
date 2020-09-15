using System;

namespace _08.FactorialDivision
{
    class Program
    {
        static void Main(string[] args)
        {
            FactorialDivison();
        }
        static void FactorialDivison()
        {
            long fact1 = long.Parse(Console.ReadLine());
            long fact2 = long.Parse(Console.ReadLine());
            if (fact1 > 0 && fact2 > 0)
            {
                var result1 = FactorialResult(fact1);
                var result2 = FactorialResult(fact2);
                var total = result1 / result2;
                Console.WriteLine($"{total:f2}");
            }
            else
            {
                return;
            }
        }
        static double FactorialResult(double fact)
        {
            for (double i = fact - 1; i >= 1; i--)
            {
                fact = fact * i;
            }
            return fact;
        }
    }
}
