using System;

namespace _03.Elevator
{
    class Program
    {
        static void Main(string[] args)
        {
            var nPeople = int.Parse(Console.ReadLine());
            var capacity = int.Parse(Console.ReadLine());

            Console.WriteLine((int)Math.Ceiling((double)nPeople / capacity));
        }
    }
}