using System;
using System.Collections.Generic;
using System.Linq;

namespace _10.SoftUniCoursePlanning
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> schedule = Console.ReadLine()
                .Split(", ", StringSplitOptions.RemoveEmptyEntries)
                .ToList();

            string input;

            while ((input = Console.ReadLine()) != "course start")
            {
                var splitInput = input.Split(':').ToArray();
                var command = splitInput[0];
                var lesson = splitInput[1];

                if (command == "Add")
                {
                    GetAddFunction(schedule, lesson);
                }
                else if (command == "Insert")
                {
                    var index = int.Parse(splitInput[2]);
                    GetInsertFunction(schedule, lesson, index);
                }
                else if (command == "Remove")
                {
                    GetRemoveFunction(schedule, lesson);
                }
                else if (command == "Swap")
                {
                    var lesson2 = splitInput[2];
                    GetSwapFunction(schedule, lesson, lesson2);
                }
                else if (command == "Exercise")
                {
                    GetExerciseFunction(schedule, lesson);
                }
            }
            var count = 1;
            foreach (var lesson in schedule)
            {
                Console.WriteLine($"{count}.{lesson}");
                count++;
            }
        }
        static void GetExerciseFunction(List<string> schedule, string lesson)
        {
            string exercise = $"{lesson}-Exercise";
            if (!schedule.Contains(exercise))
            {
                if (schedule.Contains(lesson))
                {
                    var lessonIndex = schedule.IndexOf(lesson);
                    schedule.Insert(lessonIndex + 1, exercise);
                }
                else
                {
                    schedule.Add(lesson);
                    schedule.Add(exercise);
                }
            }
        }
        static void GetSwapFunction(List<string> schedule, string lesson1, string lesson2)
        {
            string exercise = "{0}-Exercise";

            if (schedule.Contains(lesson1) && schedule.Contains(lesson2))
            {
                int firstLesson = schedule.IndexOf(lesson1);
                int secondLesson = schedule.IndexOf(lesson2);
                schedule[firstLesson] = lesson2;
                schedule[secondLesson] = lesson1;


                string firstLessonExercise = string.Format(exercise, lesson1);
                string secondLessonExercise = string.Format(exercise, lesson2);

                if (schedule.Contains(firstLessonExercise))
                {
                    int firstLessonIndex = schedule.IndexOf(firstLessonExercise);
                    schedule.RemoveAt(firstLessonIndex);
                    schedule.Insert(secondLesson + 1, firstLessonExercise);
                }
                if (schedule.Contains(secondLessonExercise))
                {
                    int secondLessonIndex = schedule.IndexOf(secondLessonExercise);
                    schedule.RemoveAt(secondLessonIndex);
                    schedule.Insert(firstLesson + 1, secondLessonExercise);
                }
            }
        }
        static void GetRemoveFunction(List<string> schedule, string lesson)
        {
            string exercise = "{0}-Exercise";
            string lessonExercise = string.Format(exercise, lesson);

            if (schedule.Contains(lesson))
            {
                schedule.Remove(lesson);
                if (schedule.Contains(lessonExercise))
                {
                    schedule.Remove(lessonExercise);
                }
            }
        }
        static void GetInsertFunction(List<string> schedule, string lesson, int index)
        {
            if (!schedule.Contains(lesson))
            {
                schedule.Insert(index, lesson);
            }
        }
        static void GetAddFunction(List<string> schedule, string input)
        {
            if (!schedule.Contains(input))
            {
                schedule.Add(input);
            }
        }
    }
}
