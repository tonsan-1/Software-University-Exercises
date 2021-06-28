using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using SharedTrip.Data;
using SharedTrip.ViewModels.Trips;

namespace SharedTrip.Services
{
    public class TripsService : ITripsService
    {
        private readonly ApplicationDbContext db;

        public TripsService(ApplicationDbContext db)
        {
            this.db = db;
        }
        public bool AddUserToTrip(string userId, string tripId)
        {
            var userInTrip = this.db.UserTrips.Any(x => x.UserId == userId && x.TripId == tripId);
            if (userInTrip)
            {
                return false;
            }

            var userTrip = new UserTrip
            {
                TripId = tripId,
                UserId = userId,
            };
            this.db.UserTrips.Add(userTrip);
            this.db.SaveChanges();
            return true;
        }
        public bool HasAvailableSeats(string tripId)
        {
            var trip = this.db.Trips.Where(x => x.Id == tripId)
                .Select(x => new { x.Seats, TakenSeats = x.UserTrips.Count() })
                .FirstOrDefault();
            var availableSeats = trip.Seats - trip.TakenSeats;
            return availableSeats > 0;
        }

        public void CreateTrip(TripsInputModel input)
        {
            var trip = new Trip
            {
                StartPoint = input.StartPoint,
                EndPoint = input.EndPoint,
                DepartureTime = DateTime.ParseExact(input.DepartureTime, "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture),
                ImagePath = input.ImagePath,
                Seats = input.Seats,
                Description = input.Description,
            };

            this.db.Trips.Add(trip);
            this.db.SaveChanges();
        }
        public IEnumerable<TripsViewModel> GetAll()
        {
            var trips = this.db.Trips.Select(x => new TripsViewModel
            {
                DepartureTime = x.DepartureTime,
                EndPoint = x.EndPoint,
                StartPoint = x.StartPoint,
                Id = x.Id,
                Seats = x.Seats,
                UsedSeats = x.UserTrips.Count(),
            }).ToList();

            return trips;
        }
        public TripsDetailsViewModel GetById(string id)
        {
            var trip = this.db.Trips.Where(x => x.Id == id)
               .Select(x => new TripsDetailsViewModel
               {
                   DepartureTime = x.DepartureTime,
                   Description = x.Description,
                   EndPoint = x.EndPoint,
                   Id = x.Id,
                   ImagePath = x.ImagePath,
                   Seats = x.Seats,
                   StartPoint = x.StartPoint,
                   UsedSeats = x.UserTrips.Count(),
               })
               .FirstOrDefault();
            return trip;
        }
    }
}
