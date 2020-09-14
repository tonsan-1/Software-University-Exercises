using System;

namespace _03.Vacation
{
    class Program
    {
        static void Main(string[] args)
        {
            var groupNum = int.Parse(Console.ReadLine());
            var groupType = Console.ReadLine();
            var dayOfTheWeek = Console.ReadLine();
            var totalPrice = 0.0m;
            var discount = 0.0m;

            if (groupType == "Students")
            {
                if (dayOfTheWeek == "Friday")
                {
                    totalPrice = 8.45m * groupNum;
                }
                else if (dayOfTheWeek == "Saturday")
                {
                    totalPrice = 9.80m * groupNum;
                }
                else if (dayOfTheWeek == "Sunday")
                {
                    totalPrice = 10.46m * groupNum;
                }
                if (groupNum >= 30)
                {
                    discount = totalPrice * 0.15m;
                    totalPrice -= discount;
                }
            }
            else if (groupType == "Business")
            {
                if (groupNum >= 100)
                {
                    groupNum -= 10;
                }
                if (dayOfTheWeek == "Friday")
                {
                    totalPrice = 10.90m * groupNum;
                }
                else if (dayOfTheWeek == "Saturday")
                {
                    totalPrice = 15.60m * groupNum;
                }
                else if (dayOfTheWeek == "Sunday")
                {
                    totalPrice = 16.00m * groupNum;
                }
            }
            else if (groupType == "Regular")
            {
                if (dayOfTheWeek == "Friday")
                {
                    totalPrice = 15.0m * groupNum;
                }
                else if (dayOfTheWeek == "Saturday")
                {
                    totalPrice = 20.0m * groupNum;
                }
                else if (dayOfTheWeek == "Sunday")
                {
                    totalPrice = 22.50m * groupNum;
                }
                if (groupNum >= 10 && groupNum <= 20)
                {
                    discount = totalPrice * 0.05m;
                    totalPrice -= discount;
                }
            }
            Console.WriteLine($"Total price: {totalPrice:f2}");
        }
    }
}
