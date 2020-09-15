using System;
using System.Collections.Generic;
using System.Linq;

namespace _08.AnonymousThreat
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> input = Console.ReadLine().Split().ToList();

            while (true)
            {
                string[] commands = Console.ReadLine().Split();
                string command = commands[0];
                if (command == "3:1")
                {
                    break;
                }
                int startIndex = int.Parse(commands[1]);
                int endIndex = int.Parse(commands[2]);
                string concatWord = string.Empty;
                if (endIndex > input.Count - 1 || endIndex < 0)
                {
                    endIndex = input.Count - 1;
                }
                if (startIndex < 0 || startIndex > input.Count)
                {
                    startIndex = 0;
                }

                if (command == "merge")
                {
                    for (int i = startIndex; i <= endIndex; i++)
                    {
                        concatWord += input[i];
                    }
                    input.RemoveRange(startIndex, endIndex - startIndex + 1);
                    input.Insert(startIndex, concatWord);

                }
                else if (command == "divide")
                {
                    List<string> divided = new List<string>();
                    int divide = int.Parse(commands[2]);
                    string word = input[startIndex];
                    input.RemoveAt(startIndex);
                    int parts = word.Length / divide;
                    for (int i = 0; i < divide; i++)
                    {
                        if (i == divide - 1)
                        {
                            divided.Add(word.Substring(i * parts));
                        }
                        else
                        {
                            divided.Add(word.Substring(i * parts, parts));
                        }
                        // string element = word.Substring(0, parts);
                        // word = word.Substring(parts);
                        // divided.Add(element);
                    }
                    input.InsertRange(startIndex, divided);
                }


            }

            Console.WriteLine(string.Join(" ", input));
        }
    }
}