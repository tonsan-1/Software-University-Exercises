namespace SharedTrip.Controllers
{
    using MyWebServer.Controllers;
    using MyWebServer.Http;
    using SharedTrip.Models.Users;
    using SharedTrip.Services;
    using System.Linq;

    public class UsersController : Controller
    {
        private readonly IUsersService usersService;
        private readonly IValidator validator;

        public UsersController(IUsersService usersService, IValidator validator)
        {
            this.usersService = usersService;
            this.validator = validator;
        }
        public HttpResponse Login()
        {
            if (this.User.IsAuthenticated)
            {
                return Redirect("/Trips/All");
            }

            return View();
        }

        [HttpPost]
        public HttpResponse Login(LoginFormModel model)
        {
            var userId = this.usersService.GetUserId(model.Username, model.Password);

            if (userId == null)
            {
                return Error("Invalid username or password.");
            }

            this.SignIn(userId);

            return Redirect("/Trips/All");
        }

        public HttpResponse Register()
        {
            if (this.User.IsAuthenticated)
            {
                return Redirect("/Trips/All");
            }

            return View();
        }

        [HttpPost]
        public HttpResponse Register(RegisterFormModel model)
        {
            var modelErrors = this.validator.ValidateUser(model);

            if (modelErrors.Any())
            {
                return Error(modelErrors);
            }

            if (!this.usersService.IsEmailAvailable(model.Email))
            {
                return Error("Email exists. Please use another one.");
            }

            if (!this.usersService.IsUsernameAvailable(model.Username))
            {
                return Error("Username exists. Please use another one.");
            }

            this.usersService.Create(model);

            return Redirect("/Users/Login");
        }

        public HttpResponse Logout()
        {
            if (!this.User.IsAuthenticated)
            {
                return Redirect("/Users/Login");
            }

            this.SignOut();

            return Redirect("/");
        }
    }
}
