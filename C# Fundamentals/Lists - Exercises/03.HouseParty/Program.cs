using System;
using System.Collections.Generic;

namespace _03.HouseParty
{
    class Program
    {
        static void Main(string[] args)
        {
            var totalGuests = int.Parse(Console.ReadLine());
            List<string> guests = new List<string>();

            for (int i = 0; i < totalGuests; i++)
            {
                var person = Console.ReadLine().Split();
                GetGuestAddOrRemoveFunction(guests, person);
            }
            for (int i = 0; i < guests.Count; i++)
            {
                Console.WriteLine(guests[i]);
            }
        }
        static void GetGuestAddOrRemoveFunction(List<string> guests, string[] person)
        {
            if (person.Length == 3)
            {
                if (guests.Contains(person[0]))
                {
                    Console.WriteLine($"{person[0]} is already in the list!");
                }
                else
                {
                    guests.Add(person[0]);
                }
            }
            if (person.Length == 4)
            {
                if (guests.Contains(person[0]))
                {
                    guests.Remove(person[0]);
                }
                else
                {
                    Console.WriteLine($"{person[0]} is not in the list!");
                }
            }
        }
    }
}