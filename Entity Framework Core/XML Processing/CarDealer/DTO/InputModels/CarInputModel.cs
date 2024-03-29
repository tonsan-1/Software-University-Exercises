﻿using System.Xml.Serialization;

namespace CarDealer.DTO.InputModels
{
    [XmlType("Car")]
    public class CarInputModel
    {
        [XmlElement("make")]
        public string Make { get; set; }

        [XmlElement("model")]
        public string Model { get; set; }

        [XmlElement("TraveledDistance")]
        public long TraveledDistance { get; set; }

        [XmlArray("parts")]
        public CarPartsInputModel[] CarPartsInputModel { get; set; }

    }

    [XmlType("partId")]
    public class CarPartsInputModel
    {
        [XmlAttribute("id")]
        public int Id { get; set; }
    }
}
