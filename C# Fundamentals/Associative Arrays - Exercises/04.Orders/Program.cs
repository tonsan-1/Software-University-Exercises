using System;
using System.Collections.Generic;
using System.Linq;

namespace _04.Orders
{
    class Program
    {
        static void Main(string[] args)
        {
            var productPrices = new Dictionary<string, decimal>();
            var productQuantities = new Dictionary<string, long>();

            string input;
            while ((input = Console.ReadLine()) != "buy")
            {
                var splitInput = input.Split(' ', StringSplitOptions.RemoveEmptyEntries).ToArray();

                var name = splitInput[0];
                var price = decimal.Parse(splitInput[1]);
                var qty = int.Parse(splitInput[2]);

                if (!productQuantities.ContainsKey(name))
                {
                    productPrices[name] = 0;
                    productQuantities[name] = 0;
                }
                productQuantities[name] += qty;
                productPrices[name] = price;
            }

            foreach (var kvp in productPrices)
            {
                string name = kvp.Key;
                decimal price = kvp.Value;
                long qty = productQuantities[name];
                decimal totalPrice = price * qty;

                Console.WriteLine($"{name} -> {totalPrice:f2}");
            }
        }
    }
}