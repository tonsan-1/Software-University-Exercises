using System;

namespace _05.AddAndSubtract
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(Subtract());
        }
        static int Add()
        {
            var num1 = int.Parse(Console.ReadLine());
            var num2 = int.Parse(Console.ReadLine());
            var result = num1 + num2;
            return result;

        }
        static int Subtract()
        {
            var sumResult = Add();
            var num3 = int.Parse(Console.ReadLine());
            var total = sumResult - num3;
            return total;
        }
    }
}