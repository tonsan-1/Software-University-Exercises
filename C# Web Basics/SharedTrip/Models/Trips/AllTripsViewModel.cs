using System;

namespace SharedTrip.Models.Trips
{
    public class AllTripsViewModel
    {
        public string Id { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public DateTime DepartureTime { get; set; }
        public virtual string DepartureTimeAsString => this.DepartureTime.ToString("dd.MM.yyyy HH:mm");
        public int AvailableSeats { get; set; }
    }
}
