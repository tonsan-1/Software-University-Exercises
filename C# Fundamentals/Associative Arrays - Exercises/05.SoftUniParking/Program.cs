using System;
using System.Collections.Generic;
using System.Linq;

namespace _05.SoftUniParking
{
    class Program
    {
        static void Main(string[] args)
        {
            var parkingLot = new Dictionary<string, string>();

            var n = int.Parse(Console.ReadLine());

            for (int i = 1; i <= n; i++)
            {
                var splitInput = Console.ReadLine()
                    .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                    .ToArray();
                var command = splitInput[0];

                if (command == "register")
                {
                    var username = splitInput[1];
                    var licensePlate = splitInput[2];
                    RegisterUsername(parkingLot, username, licensePlate);
                }
                else if (command == "unregister")
                {
                    var username = splitInput[1];
                    RemoveUsername(parkingLot, username);
                }
            }

            foreach (var kvp in parkingLot)
            {
                var username = kvp.Key;
                var licensePlate = kvp.Value;

                Console.WriteLine($"{username} => {licensePlate}");
            }

        }

        private static void RemoveUsername(Dictionary<string, string> parkingLot, string username)
        {
            if (!parkingLot.ContainsKey(username))
            {
                Console.WriteLine($"ERROR: user {username} not found");
            }
            else
            {
                parkingLot.Remove(username);
                Console.WriteLine($"{username} unregistered successfully");
            }
        }

        private static void RegisterUsername(Dictionary<string, string> parkingLot, string username, string licensePlate)
        {
            if (!parkingLot.ContainsKey(username))
            {
                parkingLot[username] = licensePlate;
                Console.WriteLine($"{username} registered {licensePlate} successfully");
            }

            else
            {
                var oldLicensePlate = parkingLot[username];
                Console.WriteLine($"ERROR: already registered with plate number {oldLicensePlate}");
            }
        }
    }
}
