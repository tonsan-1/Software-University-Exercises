namespace SharedTrip.Controllers
{
    using MyWebServer.Controllers;
    using MyWebServer.Http;
    using SharedTrip.Models.Trips;
    using SharedTrip.Services;
    using System.Linq;

    public class TripsController : Controller
    {
        private readonly ITripsService tripsService;
        private readonly IValidator validator;

        public TripsController(ITripsService tripsService , IValidator validator)
        {
            this.tripsService = tripsService;
            this.validator = validator;
        }
        public HttpResponse All()
        {
            if (!this.User.IsAuthenticated)
            {
                return Redirect("/Users/Login");
            }

            var trips = this.tripsService.GetAll();

            return View(trips);
        }

        public HttpResponse Add()
        {
            return View();
        }

        [HttpPost]
        public HttpResponse Add(AddTripFormModel model)
        {
            var modelErrors = this.validator.ValidateAddTrip(model);

            if (modelErrors.Any())
            {
                return Error(modelErrors);
            }

            this.tripsService.Create(model);

            return Redirect("/Trips/All");
        }

        public HttpResponse Details(string tripId)
        {
            if (!this.User.IsAuthenticated)
            {
                return Redirect("/Users/Login");
            }

            var trip = this.tripsService.GetDetails(tripId);

            return View(trip);
        }

        public HttpResponse AddUserToTrip(string tripId)
        {
            if (!this.User.IsAuthenticated)
            {
                return Redirect("/Users/Login");
            }

            if (!this.tripsService.HasAvailableSeats(tripId))
            {
                return Error("There aren't any seats available.");
            }

            var result = this.tripsService.AddUserToTrip(this.User.Id, tripId);

            if (result == false)
            {
                return Redirect("/Trips/Details?tripId=" + tripId);
            }

            return Redirect("/Trips/All");
        }
    }
}
