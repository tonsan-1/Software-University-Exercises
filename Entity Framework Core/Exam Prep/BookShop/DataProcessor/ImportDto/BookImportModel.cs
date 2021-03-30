using BookShop.Data.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace BookShop.DataProcessor.ImportDto
{
    [XmlType("Book")]
    public class BookImportModel
    {
        [Required]
        [StringLength(30,MinimumLength = 3)]
        [XmlElement("Name")]
        public string Name { get; set; }

        [Required]
        [Range(1,3)]
        [XmlElement("Genre")]
        public int Genre { get; set; }

        [Required]
        [Range(typeof(decimal), "0.01", "79228162514264337593543950335")]
        [XmlElement("Price")]
        public decimal Price { get; set; }

        [Required]
        [Range(50,5000)]
        [XmlElement("Pages")]
        public int Pages { get; set; }

        [Required]
        [XmlElement("PublishedOn")]
        public string PublishedOn { get; set; }

    }
}

  //< Book >
  //  < Name > Hairy Torchwood </ Name >
  //     < Genre > 3 </ Genre >
  //     < Price > 41.99 </ Price >
  //     < Pages > 3013 </ Pages >
  //     < PublishedOn > 01 / 13 / 2013 </ PublishedOn >
  //   </ Book >
