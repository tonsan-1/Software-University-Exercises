using System;
using System.Linq;

namespace _07.MaxSequenceOfEqualElements
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] arr = Console.ReadLine().Split().Select(int.Parse).ToArray();
            int bestCount = 0;
            int bestIndex = 0;

            for (int i = 0; i < arr.Length; i++)
            {
                int currElement = arr[i];
                int count = 1;
                for (int currI = i + 1; currI < arr.Length; currI++)
                {
                    if (currElement == arr[currI])
                    {
                        count++;
                    }
                    else
                    {
                        break;
                    }
                }
                if (count > bestCount)
                {
                    bestCount = count;
                    bestIndex = i;
                }
            }
            string result = "";
            for (int i = 0; i < bestCount; i++)
            {
                result += arr[bestIndex] + " ";
            }
            Console.WriteLine(result);
        }
    }
}
