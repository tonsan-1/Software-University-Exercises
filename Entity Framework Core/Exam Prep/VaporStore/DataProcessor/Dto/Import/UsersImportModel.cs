using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VaporStore.DataProcessor.Dto.Import
{
    public class UsersImportModel
    {
        [Required]
        [RegularExpression(@"^([A-Z]{1}[a-z]+)\s([A-Z]{1}[a-z]+)$")]
        public string FullName { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 3)]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Range(3,103)]
        [Required]
        public int Age { get; set; }
        public IEnumerable<CardImportModel> Cards { get; set; }
      
    }

    public class CardImportModel
    {
        [Required]
        [RegularExpression(@"^([0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4})$")]
        public string Number { get; set; }

        [Required]
        [RegularExpression(@"^([0-9]{3})$")]
        [JsonProperty("CVC")]
        public string Cvc { get; set; }

        [Required]
        public string Type { get; set; }

    }
}
