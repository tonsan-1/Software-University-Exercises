using System;

namespace _09.PadawanEquipment
{
    class Program
    {
        static void Main(string[] args)
        {
            var ivanChoMoney = double.Parse(Console.ReadLine());
            var studentsCount = int.Parse(Console.ReadLine());
            var lightSaberPrice = double.Parse(Console.ReadLine());
            var robePrice = double.Parse(Console.ReadLine());
            var beltPrice = double.Parse(Console.ReadLine());
            int freeBelts;
            var lightSabersPlus10 = Math.Ceiling(studentsCount + (studentsCount * 0.1));
            var totalLightSabers = lightSabersPlus10 * lightSaberPrice;
            var totalRobes = studentsCount * robePrice;
            if (studentsCount > 6)
            {
                freeBelts = studentsCount / 6;
            }
            else
            {
                freeBelts = 0;
            }
            var totalBelts = beltPrice * (studentsCount - freeBelts);
            var totalCost = totalBelts + totalLightSabers + totalRobes;
            if (totalCost <= ivanChoMoney)
            {
                Console.WriteLine($"The money is enough - it would cost {totalCost:f2}lv.");
            }
            else
            {
                var difference = totalCost - ivanChoMoney;
                Console.WriteLine($"Ivan Cho will need {difference:f2}lv more.");
            }
        }
    }
}