using SharedTrip.Services;
using SharedTrip.ViewModels.Trips;
using SUS.HTTP;
using SUS.MvcFramework;

namespace SharedTrip.Controllers
{
    public class TripsController : Controller
    {
        private readonly ITripsService tripsService;

        public TripsController(ITripsService tripsService)
        {
            this.tripsService = tripsService;
        }

        public HttpResponse AddUserToTrip(string tripId)
        {
            if (!this.IsUserSignedIn())
            {
                return this.Redirect("/Users/Login");
            }

            if (!this.tripsService.HasAvailableSeats(tripId))
            {
                return this.Error("No seats available.");
            }

            var userId = this.GetUserId();
            if (!this.tripsService.AddUserToTrip(userId, tripId))
            {
                return this.Redirect("/Trips/Details?tripId=" + tripId);
            }

            return this.Redirect("/Trips/All");
        }
        public HttpResponse All()
        {
            if (!this.IsUserSignedIn())
            {
                return this.Redirect("/Users/Login");
            }

            var allTrips = this.tripsService.GetAll();

            return this.View(allTrips);
        }

        public HttpResponse Add()
        {
            if (!this.IsUserSignedIn())
            {
                return this.Redirect("/Users/Login");
            }

            return this.View();
        }

        public HttpResponse Details(string tripId)
        {
            if (!this.IsUserSignedIn())
            {
                return this.Redirect("/Users/Login");
            }

            var trip = this.tripsService.GetById(tripId);

            return this.View(trip);
        }
        [HttpPost]
        public HttpResponse Add(TripsInputModel input)
        {
            if (!this.IsUserSignedIn())
            {
                return this.Redirect("/Users/Login");
            }

            if (string.IsNullOrEmpty(input.StartPoint))
            {
                return this.Error("A starting point is required.");
            }

            if (string.IsNullOrEmpty(input.EndPoint))
            {
                return this.Error("An ending point is required.");
            }

            if (string.IsNullOrEmpty(input.DepartureTime))
            {
                return this.Error("A Departure time is required.");
            }

            if (input.Seats < 2 || input.Seats > 6)
            {
                return this.Error("Seats count should be between 2 and 6.");
            }

            if (string.IsNullOrEmpty(input.Description) || input.Description.Length > 80)
            {
                return this.Error("Description should be 80 characters long.");
            }

            this.tripsService.CreateTrip(input);
            return this.Redirect("/Trips/All");
        }
    }
}
