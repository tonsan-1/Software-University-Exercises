using System;
using System.Linq;

namespace _08.MagicSum
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] arr = Console.ReadLine().Split().Select(int.Parse).ToArray();
            int magicNum = int.Parse(Console.ReadLine());

            for (int i = 0; i < arr.Length; i++)
            {
                int currElement = arr[i];
                for (int index = i + 1; index < arr.Length; index++)
                {
                    int nextElement = arr[index];
                    if (currElement + nextElement == magicNum)
                    {
                        Console.WriteLine(currElement + " " + nextElement);
                    }
                }
            }
        }
    }
}