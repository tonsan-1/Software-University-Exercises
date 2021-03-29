using System.Xml.Serialization;

namespace CarDealer.DTO.OutputModels
{
    [XmlType("sale")]
    class SalesWithAppliedDiscountModel
    {
        [XmlType("car")]
        public CarOutputModel CarInfo { get; set; }

        public decimal Discount { get; set; }

        public string CustomerName { get; set; }

        public decimal Price { get; set; }

        public decimal PriceWithDiscount { get; set; }
    }
}
