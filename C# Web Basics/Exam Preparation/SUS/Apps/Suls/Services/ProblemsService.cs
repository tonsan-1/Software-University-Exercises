﻿using Suls.Data;
using Suls.ViewModels.Problems;
using System.Collections.Generic;
using System.Linq;

namespace Suls.Services
{
    public class ProblemsService : IProblemsService
    {
        private readonly ApplicationDbContext db;

        public ProblemsService(ApplicationDbContext db)
        {
            this.db = db;
        }
        public void Create(string name, ushort points)
        {
            var problem = new Problem { Name = name, Points = points };
            this.db.Problems.Add(problem);
            this.db.SaveChanges();
        }

        public IEnumerable<HomeProblemViewModel> GetAll()
        {
            var problems = this.db.Problems.Select(x => new HomeProblemViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Count = x.Submissions.Count(),
            }).ToList();

            return problems;
        }

        public ProblemViewModel GetById(string id)
        {
            return this.db.Problems
                .Where(x => x.Id == id)
                .Select(x => new ProblemViewModel
                {
                    Name = x.Name,
                    Submissions = x.Submissions.Select(s => new SubmissionViewModel
                    {
                        CreatedOn = s.CreatedOn,
                        SubmissionId = s.Id,
                        AchievedResult = s.AchievedResult,
                        Username = s.User.Username,
                        MaxPoints = x.Points,
                    })
                }).FirstOrDefault();
        }

        public string GetNameById(string id)
        {
            var problemName = this.db.Problems
                .Where(x => x.Id == id)
                .Select(x => x.Name)
                .FirstOrDefault();

            return problemName;
        }
    }
}
