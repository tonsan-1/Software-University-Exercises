using System;
using System.Linq;

namespace _09.KaminoFactory
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());

            int[] bestArr = new int[n];
            int maxcount = 0;
            int maxIndex = 0;
            int bestSample = 1;
            int currSample = 0;
            while (true)
            {
                string line = Console.ReadLine();
                if (line == "Clone them!")
                {
                    break;
                }
                int[] currArr = line.Split('!', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray();
                currSample++;
                int bestCount = 0;
                int bestIndex = 0;
                int bestCurrSum = 0;

                for (int currIndex = 0; currIndex < currArr.Length; currIndex++)
                {
                    int currElement = currArr[currIndex];
                    int currCount = 1;
                    if (currElement == 0)
                    {
                        continue;
                    }
                    for (int index = currIndex + 1; index < currArr.Length; index++)
                    {
                        if (currArr[index] == 1)
                        {
                            currCount++;
                        }
                        else
                        {
                            break;
                        }
                    }
                    if (currCount > bestCount)
                    {
                        bestCount = currCount;
                        bestIndex = currIndex;
                        bestCurrSum = currArr.Sum();
                    }
                }
                // after itteration of the array
                if (bestCount > maxcount || (bestCount == maxcount && maxIndex > bestIndex)
                    || bestCurrSum > bestArr.Sum())
                {
                    maxIndex = bestIndex;
                    maxcount = bestCount;
                    bestArr = currArr;
                    bestSample = currSample;
                }
            }
            Console.WriteLine($"Best DNA sample {bestSample} with sum: {bestArr.Sum()}.");
            Console.WriteLine(String.Join(" ", bestArr));
        }
    }
}
