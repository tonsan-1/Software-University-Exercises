using System;
using System.Linq;

namespace _04.ArrayRotation
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] arr = Console.ReadLine().Split();
            var nRotations = int.Parse(Console.ReadLine());
            var list = arr.ToList();
            for (int i = 0; i < nRotations; i++)
            {
                var temp = list[0];
                list.RemoveAt(0);
                list.Add(temp);
            }
            arr = list.ToArray();
            Console.WriteLine(String.Join(" ", arr));
        }
    }
}