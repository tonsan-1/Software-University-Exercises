using System;

namespace _07.VendingMachine
{
    class Program
    {
        static void Main(string[] args)
        {
            string input;
            var money = 0.0;
            var Nuts = 2.0;
            var Water = 0.7;
            var Crisps = 1.5;
            var Soda = 0.8;
            var Coke = 1.0;

            while (true)
            {
                input = Console.ReadLine().ToLower();
                if (input == "start")
                {
                    break;
                }
                var coins = double.Parse(input);
                if (coins == 0.1 || coins == 0.2 || coins == 0.5 || coins == 1 || coins == 2)
                {
                    money += coins;
                }
                else
                {
                    Console.WriteLine($"Cannot accept {coins}");
                }
            }
            while (true)
            {
                input = Console.ReadLine().ToLower();
                if (input == "end")
                {
                    break;
                }
                if (input == "nuts")
                {
                    if (money >= Nuts)
                    {
                        Console.WriteLine($"Purchased {input}");
                        money -= Nuts;
                    }
                    else
                    {
                        Console.WriteLine("Sorry, not enough money");
                    }
                }
                else if (input == "water")
                {
                    if (money >= Water)
                    {
                        Console.WriteLine($"Purchased {input}");
                        money -= Water;
                    }
                    else
                    {
                        Console.WriteLine("Sorry, not enough money");
                    }
                }
                else if (input == "crisps")
                {
                    if (money >= Crisps)
                    {
                        Console.WriteLine($"Purchased {input}");
                        money -= Crisps;
                    }
                    else
                    {
                        Console.WriteLine("Sorry, not enough money");
                    }
                }
                else if (input == "soda")
                {
                    if (money >= Soda)
                    {
                        Console.WriteLine($"Purchased {input}");
                        money -= Soda;
                    }
                    else
                    {
                        Console.WriteLine("Sorry, not enough money");
                    }
                }
                else if (input == "coke")
                {
                    if (money >= Coke)
                    {
                        Console.WriteLine($"Purchased {input}");
                        money -= Coke;
                    }
                    else
                    {
                        Console.WriteLine("Sorry, not enough money");
                    }
                }
                else
                {
                    Console.WriteLine("Invalid product");
                }
            }
            Console.WriteLine($"Change: {money:F2}");
        }
    }
}
