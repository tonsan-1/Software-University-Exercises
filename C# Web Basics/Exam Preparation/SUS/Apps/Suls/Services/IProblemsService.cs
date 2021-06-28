using Suls.ViewModels.Problems;
using System.Collections.Generic;

namespace Suls.Services
{
    public interface IProblemsService
    {
        void Create(string name, ushort points);
        IEnumerable<HomeProblemViewModel> GetAll();
        string GetNameById(string id);
        ProblemViewModel GetById(string id);
    }
}
