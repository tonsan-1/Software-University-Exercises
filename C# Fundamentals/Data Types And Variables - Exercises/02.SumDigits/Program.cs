using System;

namespace _02.SumDigits
{
    class Program
    {
        static void Main(string[] args)
        {
            var num = int.Parse(Console.ReadLine());
            var n = num;
            var sum = 0;

            while (num > 0)
            {
                n %= 10;
                sum += n;
                num /= 10;
                n = num;
            }
            Console.WriteLine(sum);

        }
    }
}