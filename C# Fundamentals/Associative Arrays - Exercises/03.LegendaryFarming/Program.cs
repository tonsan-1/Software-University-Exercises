using System;
using System.Collections.Generic;
using System.Linq;

namespace _03.LegendaryFarming
{
    class LegendaryFarming
    {
        static void Main(string[] args)
        {

            var input = Console.ReadLine().Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).Select(x => x.Trim().ToLower()).ToArray();

            bool finished = false;

            var keyMaterial = new Dictionary<string, int>();
            var junkMaterial = new Dictionary<string, int>();

            keyMaterial.Add("fragments", 0);
            keyMaterial.Add("shards", 0);
            keyMaterial.Add("motes", 0);

            int counterLines = 1;
            while (counterLines != 10)
            {

                for (int i = 0; i < input.Length; i += 2)
                {
                    int quantity = int.Parse(input[i]);
                    var material = input[i + 1];

                    if (material == "fragments" || material == "shards" || material == "motes")
                    {

                        keyMaterial[material] += quantity;

                        if (keyMaterial[material] >= 250)
                        {

                            if (material == "fragments")
                            {
                                Console.WriteLine("Valanyr obtained!");
                            }
                            else if (material == "shards")
                            {
                                Console.WriteLine("Shadowmourne obtained!");
                            }
                            else
                            {
                                Console.WriteLine("Dragonwrath obtained!");
                            }

                            keyMaterial[material] = keyMaterial[material] - 250;

                            finished = true;
                            if (finished)
                            {
                                break;
                            }

                        }
                    }
                    else
                    {
                        if (!junkMaterial.ContainsKey(material))
                        {
                            junkMaterial.Add(material, quantity);
                        }
                        else
                        {
                            junkMaterial[material] += quantity;
                        }

                    }

                }
                counterLines++;
                if (finished)
                {
                    break;
                }

                input = Console.ReadLine().Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).Select(x => x.Trim().ToLower()).ToArray();
            }



            foreach (var item in keyMaterial.OrderByDescending(x => x.Value).ThenBy(x => x.Key))
            {
                Console.WriteLine($"{item.Key}: {item.Value}");

            }
            foreach (var item in junkMaterial.OrderBy(x => x.Key))
            {
                Console.WriteLine($"{item.Key}: {item.Value}");
            }

            ;

        }
    }
}