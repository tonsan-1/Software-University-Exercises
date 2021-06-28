using Suls.Services;
using Suls.ViewModels.Submissons;
using SUS.HTTP;
using SUS.MvcFramework;

namespace Suls.Controllers
{
    public class SubmissionsController : Controller
    {
        private readonly IProblemsService problemsService;
        private readonly ISubmissionService submissionService;

        public SubmissionsController(IProblemsService problemsService, ISubmissionService submissionService)
        {
            this.problemsService = problemsService;
            this.submissionService = submissionService;
        }
        public HttpResponse Create(string id)
        {
            if (!this.IsUserSignedIn())
            {
                return this.Redirect("/Users/Login");
            }

            var viewModel = new CreateViewModel
            {
                ProblemId = id,
                Name = this.problemsService.GetNameById(id)
            };

            return this.View(viewModel);
        }

        [HttpPost]
        public HttpResponse Create(string problemId, string code)
        {
            if (!this.IsUserSignedIn())
            {
                return this.Redirect("/Users/Login");
            }

            if (string.IsNullOrEmpty(code) || code.Length < 30 || code.Length > 800)
            {
                return this.Error("Code should be between 30 and 800 characters long.");
            }

            var userId = this.GetUserId();
            this.submissionService.Create(problemId, userId, code);
            return this.Redirect("/");
        }

        public HttpResponse Delete(string id)
        {
            if (!this.IsUserSignedIn())
            {
                return this.Redirect("/Users/Login");
            }

            this.submissionService.Delete(id);
            return this.Redirect("/");
        }
    }
}
