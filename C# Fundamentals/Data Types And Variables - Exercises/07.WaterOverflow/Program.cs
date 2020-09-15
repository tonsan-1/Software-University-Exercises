using System;

namespace _07.WaterOverflow
{
    class Program
    {
        static void Main(string[] args)
        {
            var Maxcapacity = 255;
            var capacity = 0;
            var n = int.Parse(Console.ReadLine());

            for (int i = 0; i < n; i++)
            {
                int Litres = int.Parse(Console.ReadLine());
                if (capacity + Litres <= Maxcapacity)
                {
                    capacity += Litres;
                }
                else
                {
                    Console.WriteLine("Insufficient capacity!");
                }

            }
            Console.WriteLine(capacity);


        }
    }
}
