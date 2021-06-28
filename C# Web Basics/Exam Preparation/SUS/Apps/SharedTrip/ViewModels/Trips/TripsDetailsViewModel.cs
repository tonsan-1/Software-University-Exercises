namespace SharedTrip.ViewModels.Trips
{
    public class TripsDetailsViewModel : TripsViewModel
    {
        public string ImagePath { get; set; }
        public string Description { get; set; }
        public string DepartureTimeFormatted => this.DepartureTime.ToString("s");
    }
}
