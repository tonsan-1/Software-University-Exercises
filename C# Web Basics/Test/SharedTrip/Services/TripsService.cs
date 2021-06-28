namespace SharedTrip.Services
{
    using SharedTrip.Data;
    using SharedTrip.Data.Models;
    using SharedTrip.Models.Trips;
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;

    public class TripsService : ITripsService
    {
        private readonly ApplicationDbContext db;

        public TripsService(ApplicationDbContext db)
        {
            this.db = db;
        }
        public void Create(AddTripFormModel model)
        {
            var trip = new Trip
            {
                StartPoint = model.StartPoint,
                EndPoint = model.EndPoint,
                DepartureTime = DateTime.ParseExact(model.DepartureTime, "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture),
                Seats = model.Seats,
                Description = model.Description,
                ImagePath = model.ImagePath
            };

            this.db.Trips.Add(trip);
            this.db.SaveChanges();
        }
        public bool AddUserToTrip(string userId, string tripId)
        {
            var userInTrip = this.db.UserTrips.Any(x => x.UserId == userId && x.TripId == tripId);

            if (!userInTrip)
            {
                var userTrip = new UserTrip
                {
                    TripId = tripId,
                    UserId = userId,
                };

                this.db.UserTrips.Add(userTrip);
                this.db.SaveChanges();

                return true;
            }

            return false;
        }
        public bool HasAvailableSeats(string tripId)
        {
            var trip = this.db.Trips
                    .Where(x => x.Id == tripId)
                    .Select(x => new
                    {
                        Seats = x.Seats,
                        UsedSeats = x.UserTrips.Count
                    }).FirstOrDefault();

            var availableSeats = trip.Seats - trip.UsedSeats;

            return availableSeats > 0 ? true : false;
        }

        public IEnumerable<AllTripsViewModel> GetAll()
        {
            var trips = this.db.Trips
                    .Select(x => new AllTripsViewModel
                    {
                        Id = x.Id,
                        StartPoint = x.StartPoint,
                        EndPoint = x.EndPoint,
                        DepartureTime = x.DepartureTime,
                        AvailableSeats = x.Seats - x.UserTrips.Count
                    }).ToList();

            return trips;
        }

        public TripDetailsViewModel GetDetails(string id)
        {
            var trip = this.db.Trips
                    .Where(x => x.Id == id)
                    .Select(x => new TripDetailsViewModel
                    {
                        Id = x.Id,
                        ImagePath = x.ImagePath,
                        StartPoint = x.StartPoint,
                        EndPoint = x.EndPoint,
                        DepartureTime = x.DepartureTime,
                        Description = x.Description,
                        AvailableSeats = x.Seats - x.UserTrips.Count
                    })
                    .FirstOrDefault();

            return trip;
        }
    }
}
