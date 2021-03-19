using System.Xml.Serialization;

namespace CarDealer.DTO.OutputModels
{
    [XmlType("suplier")]
    public class NationalSupplierOutputModel
    {
        [XmlAttribute("id")]
        public int Id { get; set; }

        [XmlAttribute("name")]
        public string Name { get; set; }

        [XmlAttribute("parts-count")]
        public int Parts { get; set; }
    }
}
