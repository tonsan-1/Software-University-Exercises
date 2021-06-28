namespace SharedTrip.Services
{
    using SharedTrip.Models.Trips;
    using System.Collections.Generic;

    public interface ITripsService
    {
        void Create(AddTripFormModel model);

        IEnumerable<AllTripsViewModel> GetAll();

        TripDetailsViewModel GetDetails(string id);

        bool HasAvailableSeats(string tripId);

        bool AddUserToTrip(string userId, string tripId);
    }
}
