using System;

namespace _08.BeerKegs
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            var beerKeg = "";
            var currentVolume = 0.0;
            for (int i = 0; i < n; i++)
            {
                var kegModel = Console.ReadLine();
                var kegRadius = float.Parse(Console.ReadLine());
                var kegHeight = int.Parse(Console.ReadLine());
                var kegVolume = Math.PI * kegRadius * kegRadius * kegHeight;
                if (kegVolume >= currentVolume)
                {
                    beerKeg = kegModel;
                    currentVolume = kegVolume;
                }
            }
            Console.WriteLine(beerKeg);
        }
    }
}
