using System;

namespace _05.Login
{
    class Program
    {
        static void Main(string[] args)
        {
            var username = Console.ReadLine();
            var charArray = username.ToCharArray();
            Array.Reverse(charArray);
            var password = new string(charArray);
            var counter = 0;
            string input;
            while (true)
            {
                input = Console.ReadLine();
                if (input != password)
                {
                    counter++;
                    if (counter == 4)
                    {
                        Console.WriteLine($"User {username} blocked!");
                        return;
                    }
                    Console.WriteLine("Incorrect password. Try again.");
                }
                else
                {
                    Console.WriteLine($"User {username} logged in.");
                    return;
                }
            }
        }
    }
}
