using System;
using System.Collections.Generic;
using System.Linq;

namespace _05.TeamworkProjects
{
    class Program
    {
        static void Main(string[] args)
        {
            int count = int.Parse(Console.ReadLine());
            List<Team> allTeams = new List<Team>();

            for (int i = 0; i < count; i++)
            {
                var splitInput = Console.ReadLine().Split("-");
                var creator = splitInput[0];
                var name = splitInput[1];

                Team existingTeam = allTeams.Find(t => t.Name == name);
                Team existingTeamCreator = allTeams.Find(t => t.Creator == creator);

                if (existingTeam != null)
                {
                    Console.WriteLine($"Team {name} was already created!");
                    continue;
                }
                if (existingTeamCreator != null)
                {
                    Console.WriteLine($"{creator} cannot create another team!");
                    continue;
                }

                Team myTeam = new Team(splitInput[0], splitInput[1]);
                allTeams.Add(myTeam);
                Console.WriteLine($"Team {myTeam.Name} has been created by {myTeam.Creator}!");
            }

            string line;

            while ((line = Console.ReadLine()) != "end of assignment")
            {
                var splitInput = line.Split("->");
                var member = splitInput[0];
                var teamName = splitInput[1];

                Team existingTeam = allTeams.Find(t => t.Name == teamName);
                Team exisitngTeamMember = allTeams.Find(t => t.Members.Contains(member) || t.Creator == member);

                if (existingTeam == null)
                {
                    Console.WriteLine($"Team {teamName} does not exist!");
                    continue;
                }
                if (exisitngTeamMember != null)
                {
                    Console.WriteLine($"Member {member} cannot join team {teamName}!");
                    continue;
                }

                existingTeam.Members.Add(member);
            }

            List<string> allDisbandedTeams = allTeams
                .Where(t => t.Members.Count == 0)
                .OrderBy(a => a.Name)
                .Select(a => a.Name)
                .ToList();

            allTeams.RemoveAll(t => t.Members.Count == 0);

            List<Team> sortedTeams = allTeams
                .OrderByDescending(t => t.Members.Count)
                .ThenBy(t => t.Name)
                .ToList();

            foreach (Team team in sortedTeams)
            {
                Console.WriteLine(team.ToString());
            }
            Console.WriteLine("Teams to disband:");
            foreach (string team in allDisbandedTeams)
            {
                Console.WriteLine(team.ToString());
            }
        }
    }
    class Team
    {
        public Team(string creator, string name)
        {
            this.Creator = creator;
            this.Name = name;
            this.Members = new List<string>();
        }
        public string Creator { get; set; }

        public string Name { get; set; }

        public List<string> Members { get; set; }

        public override string ToString()
        {
            List<string> sortedMembers = this.Members
                .OrderBy(a => a)
                .ToList();

            string output = $"{this.Name}\n";
            output += $"- {this.Creator}\n";

            for (int i = 0; i < this.Members.Count; i++)
            {
                output += $"-- {sortedMembers[i]}\n";
            }

            return output.Trim();
        }
    }
}
