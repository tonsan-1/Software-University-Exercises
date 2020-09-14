using System;

namespace _01.Ages
{
    class Program
    {
        static void Main(string[] args)
        {
            var age = int.Parse(Console.ReadLine());
            string person = "";

            if (age <= 2)
            {
                person = "baby";
            }
            else if (age > 2 && age <= 13)
            {
                person = "child";
            }
            else if (age > 13 && age <= 19)
            {
                person = "teenager";
            }
            else if (age > 19 && age <= 65)
            {
                person = "adult";
            }
            else if (age >= 65)
            {
                person = "elder";
            }
            else
            {
                return;
            }
            Console.WriteLine(person);
        }
    }
}