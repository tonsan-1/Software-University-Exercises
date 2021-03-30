using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookShop.DataProcessor.ImportDto
{
    public class AuthorImportModel
    {
        [Required]
        [StringLength(30,MinimumLength = 3)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string LastName { get; set; }

        [Required]
        [RegularExpression(@"^([0-9]{3})-([0-9]{3})-([0-9]{4})$")]
        public string Phone { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public AuthorBookImportModel[] Books { get; set; }
    }

    public class AuthorBookImportModel
    {
        public int? Id { get; set; }
    }
}
