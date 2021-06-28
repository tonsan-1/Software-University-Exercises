using SharedTrip.ViewModels.Trips;
using System.Collections.Generic;

namespace SharedTrip.Services
{
    public interface ITripsService
    {
        void CreateTrip(TripsInputModel input);
        TripsDetailsViewModel GetById(string id);
        IEnumerable<TripsViewModel> GetAll();
        public bool AddUserToTrip(string userId, string tripId);
        public bool HasAvailableSeats(string tripId);
    }
}
