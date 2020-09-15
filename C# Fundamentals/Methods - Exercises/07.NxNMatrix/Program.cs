using System;

namespace _07.NxNMatrix
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            GetNMatrix(n);

        }
        static void GetNMatrix(int n)
        {
            for (int i = 0; i < n; i++) // row
            {
                for (int j = 0; j < n; j++) //cow
                {
                    Console.Write(n + " ");
                }
                Console.WriteLine();
            }
        }
    }
}
