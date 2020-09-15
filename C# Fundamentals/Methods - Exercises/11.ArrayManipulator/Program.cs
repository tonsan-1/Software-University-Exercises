using System;
using System.Linq;

namespace _11.ArrayManipulator
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] n = Console.ReadLine().Split(" ").Select(int.Parse).ToArray();
            string command = "";

            while (command != "end")
            {
                string[] commandArr = Console.ReadLine().Split(" ").ToArray();
                if (commandArr[0] == "end")
                {
                    break;
                }
                int x = 0;
                if (commandArr[0] == "exchange")
                {
                    command = commandArr[0];
                    x = int.Parse(commandArr[1]);
                    if (x < 0 || x > n.Length - 1)
                    {
                        Console.WriteLine("Invalid index");
                        continue;
                    }
                    else
                    {
                        ExchangeN(n, x);
                    }
                }

                if (commandArr[0] == "max")
                {
                    command = commandArr[1];
                    FindMaxEvenOdd(n, command);
                }

                if (commandArr[0] == "min")
                {
                    command = commandArr[1];
                    FindMinEvenOdd(n, command);
                }

                if (commandArr[0] == "first")
                {
                    command = commandArr[2];
                    x = int.Parse(commandArr[1]);

                    if (x > n.Length)
                    {
                        Console.WriteLine("Invalid count");
                    }
                    else
                    {
                        Console.Write("[");
                        FindFirstEvenOdd(n, command, x);
                        Console.WriteLine("]");
                    }
                }

                if (commandArr[0] == "last")
                {
                    command = commandArr[2];
                    x = int.Parse(commandArr[1]);
                    if (x > n.Length)
                    {
                        Console.WriteLine("Invalid count");
                    }
                    else
                    {
                        Console.Write("[");
                        FindLastEvenOdd(n, command, x);
                        Console.WriteLine("]");
                    }
                }
            }

            Console.Write("[");
            for (int i = 0; i < n.Length; i++)
            {
                Console.Write(n[i]);
                if (i < n.Length - 1)
                {
                    Console.Write(", ");
                }
            }
            Console.WriteLine("]");
        }
        static void ExchangeN(int[] n, int x)
        {
            int temp = 0;
            for (int i = 0; i <= x; i++)
            {
                temp = n[0];
                for (int j = 1; j < n.Length; j++)
                {
                    n[j - 1] = n[j];
                }
                n[n.Length - 1] = temp;
            }
        }
        static void FindMaxEvenOdd(int[] n, string command)
        {
            int x = int.MinValue;
            int result = 0;
            int counter = 0;
            for (int i = 0; i < n.Length; i++)
            {
                if (command == "odd" && n[i] % 2 != 0 && n[i] >= x)
                {
                    x = n[i];
                    result = i;
                    counter++;
                }

                if (command == "even" && n[i] % 2 == 0 && n[i] >= x)
                {
                    x = n[i];
                    result = i;
                    counter++;
                }

            }

            if (counter > 0)
            {
                Console.WriteLine(result);
            }
            else if (counter == 0)
            {
                Console.WriteLine("No matches");
            }
        }

        static void FindMinEvenOdd(int[] n, string command)
        {
            int x = int.MaxValue;
            int result = 0;
            int counter = 0;
            for (int i = 0; i < n.Length; i++)
            {
                if (command == "odd" && n[i] % 2 != 0 && n[i] <= x)
                {
                    x = n[i];
                    result = i;
                    counter++;
                }

                if (command == "even" && n[i] % 2 == 0 && n[i] <= x)
                {
                    x = n[i];
                    result = i;
                    counter++;
                }

            }

            if (counter > 0)
            {
                Console.WriteLine(result);
            }
            else if (counter == 0)
            {
                Console.WriteLine("No matches");
            }
        }

        static void FindFirstEvenOdd(int[] n, string command, int x)
        {

            int[] n1 = new int[x];
            int x1 = 0;
            int counter = 0;

            if (command == "odd")
            {
                for (int i = 0; i < n1.Length; i++)
                {
                    for (int j = x1; j < n.Length; j++)
                    {
                        if (n[j] % 2 != 0)
                        {
                            n1[i] = n[j];
                            x1 = j + 1;
                            counter++;
                            break;
                        }
                    }
                }
            }

            if (command == "even")
            {
                for (int i = 0; i < n1.Length; i++)
                {
                    for (int j = x1; j < n.Length; j++)
                    {
                        if (n[j] % 2 == 0)
                        {
                            n1[i] = n[j];
                            x1 = j + 1;
                            counter++;
                            break;
                        }
                    }
                }
            }

            for (int i = 0; i < counter; i++)
            {
                Console.Write(n1[i]);
                if (i < counter - 1)
                {
                    Console.Write(", ");
                }
            }

        }

        static void FindLastEvenOdd(int[] n, string command, int x)
        {

            int[] n1 = new int[x];
            int x1 = n.Length - 1;
            int counter = 0;

            if (command == "odd")
            {
                for (int i = 0; i < n1.Length; i++)
                {
                    for (int j = x1; j >= 0; j--)
                    {
                        if (n[j] % 2 != 0)
                        {
                            n1[i] = n[j];
                            x1 = j - 1;
                            counter++;
                            break;
                        }
                    }
                }
            }

            if (command == "even")
            {
                for (int i = 0; i < n1.Length; i++)
                {
                    for (int j = x1; j >= 0; j--)
                    {
                        if (n[j] % 2 == 0)
                        {
                            n1[i] = n[j];
                            x1 = j - 1;
                            counter++;
                            break;
                        }
                    }
                }
            }

            for (int i = counter - 1; i >= 0; i--)
            {
                Console.Write(n1[i]);
                if (i > 0)
                {
                    Console.Write(", ");
                }
            }

        }
    }
}