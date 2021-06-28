using System.ComponentModel.DataAnnotations;

namespace SharedTrip.Data
{
    public class UserTrip
    {
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        [Required]
        public string TripId { get; set; }
        public Trip Trip { get; set; }
    }
}
