using System;
using System.Linq;

namespace _10.LadyBugs
{
    class Program
    {


        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            int[] indexes = Console.ReadLine().Split().Select(int.Parse).ToArray();

            int[] ladybugs = new int[n];

            foreach (int index in indexes.Where(x => x >= 0 && x < n))
            {
                ladybugs[index] = 1;
            }

            string input = Console.ReadLine();
            while (input != "end")
            {
                string[] myArr = input.Split();
                int startIndex = int.Parse(myArr[0]);
                string direction = myArr[1];
                int steps = int.Parse(myArr[2]);

                if (startIndex >= 0 && startIndex < n && ladybugs[startIndex] == 1)
                {
                    ladybugs[startIndex] = 0;

                    try
                    {
                        switch (direction)
                        {
                            case "left":
                                while (ladybugs[startIndex - steps] == 1)
                                {
                                    startIndex -= steps;
                                }
                                ladybugs[startIndex - steps] = 1;
                                break;

                            case "right":
                                while (ladybugs[startIndex + steps] == 1)
                                {
                                    startIndex += steps;
                                }
                                ladybugs[startIndex + steps] = 1;
                                break;
                        }
                    }
                    catch (Exception)
                    {
                    }
                }
                input = Console.ReadLine();
            }
            Console.WriteLine(string.Join(" ", ladybugs));
        }

    }
}
