using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace VaporStore.DataProcessor.Dto.Import
{
    [XmlType("Purchase")]
    public class PurchaseImportModel
    {
        [XmlAttribute("title")]
        [Required]
        public string GameName { get; set; }

        [Required]
        [XmlElement("Type")]
        public string Type { get; set; }

        [Required]
        [XmlElement("Key")]
        [RegularExpression(@"^([A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{4})$")]
        public string ProductKey { get; set; }

        [Required]
        [XmlType("Card")]
        public CardImportModel CardNumber { get; set; }

        [Required]
        [XmlElement("Date")]
        public string Date { get; set; }

    }
}
