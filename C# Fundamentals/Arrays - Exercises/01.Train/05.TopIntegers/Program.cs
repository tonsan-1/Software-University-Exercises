using System;
using System.Linq;

namespace _05.TopIntegers
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] arr = Console.ReadLine().Split().Select(int.Parse).ToArray();
            string result = "";
            for (int i = 0; i < arr.Length; i++)
            {
                int current = arr[i];
                bool isInteger = true;
                for (int index = i + 1; index < arr.Length; index++)
                {
                    if (current <= arr[index])
                    {
                        isInteger = false;
                        break;
                    }
                }
                if (isInteger)
                {
                    result += current + " ";
                }
            }
            Console.WriteLine(result);
        }
    }
}
