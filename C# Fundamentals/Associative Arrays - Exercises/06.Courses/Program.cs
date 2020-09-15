using System;
using System.Collections.Generic;
using System.Linq;

namespace _06.Courses
{
    class Program
    {
        static void Main(string[] args)
        {
            var courses = new Dictionary<string, List<string>>();

            string input;
            while ((input = Console.ReadLine()) != "end")
            {
                var splitInput = input
                    .Split(" : ", StringSplitOptions.RemoveEmptyEntries)
                    .ToArray();

                var course = splitInput[0];
                var name = splitInput[1];

                if (!courses.ContainsKey(course))
                {
                    courses[course] = new List<string>();
                }

                courses[course].Add(name);
            }

            var orderedCourses = courses
                .OrderByDescending(kvp => kvp.Value.Count)
                .ToDictionary(a => a.Key, b => b.Value);

            foreach (var kvp in orderedCourses)
            {
                var currCourse = kvp.Key;
                var names = kvp.Value;
                var totalStudents = kvp.Value.Count;

                Console.WriteLine($"{currCourse}: {totalStudents}");

                foreach (var name in names.OrderBy(a => a))
                {
                    Console.WriteLine($"-- {name}");
                }
            }
        }
    }
}
