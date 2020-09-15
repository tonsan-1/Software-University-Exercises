using System;
using System.Collections.Generic;
using System.Linq;

namespace _07.StudentAcademy
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = double.Parse(Console.ReadLine());

            var students = new Dictionary<string, List<double>>();

            for (double i = 1; i <= n; i++)
            {
                var name = Console.ReadLine();
                var grade = double.Parse(Console.ReadLine());


                if (!students.ContainsKey(name))
                {
                    students[name] = new List<double>();
                    students[name].Add(grade);
                }
                else
                {
                    students[name].Add(grade);
                }
            }


            var aboveCertainGrades = students
                .Where(kvp => kvp.Value.Any(g => g >= 4.50))
                .ToDictionary(a => a.Key, b => b.Value);


            foreach (var kvp in aboveCertainGrades.OrderByDescending(x => x.Value.Average()))
            {
                var name = kvp.Key;
                var grade = kvp.Value.Average();

                if (kvp.Value.Average() >= 4.50)
                {
                    Console.WriteLine($"{name} -> {grade:f2}");
                }
            }
        }
    }
}