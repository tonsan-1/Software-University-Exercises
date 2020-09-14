using System;

namespace _10.RageExpenses
{
    class Program
    {
        static void Main(string[] args)
        {
            var lostGameCount = int.Parse(Console.ReadLine());
            var headsetPrice = double.Parse(Console.ReadLine());
            var mousePrice = double.Parse(Console.ReadLine());
            var keyboardPrice = double.Parse(Console.ReadLine());
            var displayPrice = double.Parse(Console.ReadLine());
            var headsetTrashes = 0;
            var mouseTrashes = 0;
            var keyboardTrashes = 0;
            var displayTrashes = 0;
            if (lostGameCount >= 2)
            {
                headsetTrashes = lostGameCount / 2;
            }
            if (lostGameCount >= 3)
            {
                mouseTrashes = lostGameCount / 3;
            }
            if (lostGameCount >= 6)
            {
                keyboardTrashes = lostGameCount / 6;
            }
            if (lostGameCount >= 12)
            {
                displayTrashes = lostGameCount / 12;
            }
            var totalHeadsetPrice = headsetTrashes * headsetPrice;
            var totalMousePrice = mouseTrashes * mousePrice;
            var totalKeyboardPrice = keyboardTrashes * keyboardPrice;
            var totalDisplayPrice = displayTrashes * displayPrice;
            var rageExpenses = totalMousePrice + totalKeyboardPrice + totalHeadsetPrice + totalDisplayPrice;
            Console.WriteLine($"Rage expenses: {rageExpenses:f2} lv.");
        }
    }
}
