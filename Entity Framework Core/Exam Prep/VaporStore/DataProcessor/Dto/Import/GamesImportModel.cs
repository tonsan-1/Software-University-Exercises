using System.ComponentModel.DataAnnotations;

namespace VaporStore.DataProcessor.Dto.Import
{
    public class GamesImportModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [Range(typeof(decimal), "0", "79228162514264337593543950335")]
        public decimal Price { get; set; }

        [Required]
        public string ReleaseDate { get; set; }

        [Required]
        public string Developer { get; set; }

        [Required]
        public string Genre { get; set; }

        [MinLength(1)]
        public string[] Tags { get; set; }

    }
}

//"Name": "Invalid",
//    "Price": -5,
//    "ReleaseDate": "2013-07-09",
//    "Developer": "Valid Dev",
//    "Genre": "Valid Genre",
//    "Tags": ["Valid Tag"]
