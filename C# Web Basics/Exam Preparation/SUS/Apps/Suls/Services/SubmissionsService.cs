using Suls.Data;
using System;
using System.Linq;

namespace Suls.Services
{
    public class SubmissionsService : ISubmissionService
    {
        private readonly ApplicationDbContext db;
        private readonly Random random;

        public SubmissionsService(ApplicationDbContext db, Random random)
        {
            this.db = db;
            this.random = random;
        }
        public void Create(string problemId,string userId, string code)
        {
            var problemmaxPoints = this.db.Problems
                .Where(x => x.Id == problemId)
                .Select(x => x.Points)
                .FirstOrDefault();

            var submission = new Submission
            {
                Code = code,
                ProblemId = problemId,
                UserId = userId,
                CreatedOn = DateTime.UtcNow,
                AchievedResult = (ushort)this.random.Next(0, problemmaxPoints + 1),
            };

            this.db.Submissions.Add(submission);
            this.db.SaveChanges();
        }

        public void Delete(string id)
        {
            var submisson = this.db.Submissions.Find(id);
            this.db.Submissions.Remove(submisson);
            this.db.SaveChanges();
        }
    }
}
