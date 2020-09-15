using System;
using System.Collections.Generic;
using System.Linq;

namespace _06.CardsGame
{
    class Program
    {
        static void Main(string[] args)
        {
            var firstDeck = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToList();
            var secondDeck = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToList();

            GetBestPlayer(firstDeck, secondDeck);

            if (firstDeck.Count > secondDeck.Count)
            {
                Console.WriteLine($"First player wins! Sum: {firstDeck.Sum()}");
            }
            else
            {
                Console.WriteLine($"Second player wins! Sum: {secondDeck.Sum()}");
            }

        }
        static void GetBestPlayer(List<int> firstDeck, List<int> secondDeck)
        {
            for (int i = 0; i < firstDeck.Count;)
            {
                var currFirstCard = firstDeck[i];

                for (int j = 0; j < secondDeck.Count;)
                {
                    var currSecondCard = secondDeck[j];

                    if (currFirstCard > currSecondCard)
                    {
                        firstDeck.Add(currFirstCard);
                        firstDeck.Remove(currFirstCard);
                        firstDeck.Add(currSecondCard);
                        secondDeck.Remove(currSecondCard);
                        if (firstDeck.Count == 0 || secondDeck.Count == 0)
                        {
                            return;
                        }
                        break;
                    }
                    else if (currSecondCard > currFirstCard)
                    {
                        secondDeck.Add(currSecondCard);
                        secondDeck.Remove(currSecondCard);
                        secondDeck.Add(currFirstCard);
                        firstDeck.Remove(currFirstCard);
                        if (firstDeck.Count == 0 || secondDeck.Count == 0)
                        {
                            return;
                        }
                        break;
                    }
                    else
                    {
                        firstDeck.Remove(currFirstCard);
                        secondDeck.Remove(currSecondCard);
                        if (firstDeck.Count == 0 || secondDeck.Count == 0)
                        {
                            return;
                        }
                        break;
                    }
                }
            }
        }
    }
}
