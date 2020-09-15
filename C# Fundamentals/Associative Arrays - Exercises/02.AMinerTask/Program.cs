using System;
using System.Collections.Generic;

namespace _02.AMinerTask
{
    class Program
    {
        static void Main(string[] args)
        {
            var materials = new Dictionary<string, long>();

            string product;
            while ((product = Console.ReadLine()) != "stop")
            {
                var quantity = int.Parse(Console.ReadLine());

                if (!materials.ContainsKey(product))
                {
                    materials[product] = 0;
                }
                materials[product] += quantity;
            }

            foreach (var kvp in materials)
            {
                Console.WriteLine($"{kvp.Key} -> {kvp.Value}");
            }
        }
    }
}