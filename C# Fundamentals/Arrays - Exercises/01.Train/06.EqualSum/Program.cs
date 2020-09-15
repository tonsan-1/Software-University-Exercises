using System;
using System.Linq;

namespace _06.EqualSum
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] arr = Console.ReadLine().Split().Select(int.Parse).ToArray();
            bool isFound = false;

            for (int curr = 0; curr < arr.Length; curr++)
            {
                var sumRight = 0;
                for (int i = curr + 1; i < arr.Length; i++)
                {
                    sumRight += arr[i];
                }
                var sumLeft = 0;
                for (int i = curr - 1; i >= 0; i--)
                {
                    sumLeft += arr[i];
                }
                if (sumLeft == sumRight)
                {
                    Console.WriteLine(curr);
                    isFound = true;
                }
            }
            if (isFound == false)
            {
                Console.WriteLine("no");
            }
        }
    }
}
