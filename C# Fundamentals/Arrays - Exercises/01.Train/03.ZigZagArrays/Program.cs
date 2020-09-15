using System;

namespace _03.ZigZagArrays
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            string[] arr1 = new string[n];
            string[] arr2 = new string[n];
            for (int i = 0; i < n; i++)
            {
                string[] current = Console.ReadLine().Split();
                if (i % 2 == 0)
                {
                    arr1[i] = current[0];
                    arr2[i] = current[1];
                }
                else
                {
                    arr1[i] = current[1];
                    arr2[i] = current[0];
                }
            }
            Console.WriteLine(String.Join(" ", arr1));
            Console.WriteLine(String.Join(" ", arr2));
        }
    }
}
