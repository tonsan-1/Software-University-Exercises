using System.Xml.Serialization;

namespace SoftJail.DataProcessor.ExportDto
{
    [XmlType("Message")]
    public class EncryptedMessageExportModel
    {
        [XmlElement("Description")]
        public string Description { get; set; }

    }
}
