using CarDealer.Data;
using System.IO;
using System;
using System.Linq;
using CarDealer.Models;
using CarDealer.DTO.InputModels;
using CarDealer.XMLConverter;
using System.Collections.Generic;
using CarDealer.DTO.OutputModels;

namespace CarDealer
{
    public class StartUp
    {
        public static void Main(string[] args)
        { 
            var context = new CarDealerContext();
            //context.Database.EnsureDeleted();
            //context.Database.EnsureCreated();

            //var supplierXml = File.ReadAllText("./Datasets/suppliers.xml");
            //var partsXml = File.ReadAllText("./Datasets/parts.xml");
            //var carsXml = File.ReadAllText("./Datasets/cars.xml");
            //var customersXml = File.ReadAllText("./Datasets/customers.xml");
            //var salesXml = File.ReadAllText("./Datasets/sales.xml");


            //ImportSuppliers(context, supplierXml);
            //ImportParts(context, partsXml);
            //ImportCars(context, carsXml);
            //ImportCustomers(context, customersXml);
            //ImportSales(context, salesXml);

            Console.WriteLine(GetSalesWithAppliedDiscount(context));
        }
        public static string GetSalesWithAppliedDiscount(CarDealerContext context)
        {

        }
        public static string GetTotalSalesByCustomer(CarDealerContext context)
        {
            var customers = context.Customers
                .Where(x => x.Sales.Any())
                .Select(x => new TotalSalesByCustomerModel
                {
                    FullName = x.Name,
                    BoughtCars = x.Sales.Count,
                    SpentMoney = x.Sales.Select(y => y.Car)
                    .SelectMany(x => x.PartCars)
                    .Sum(x => x.Part.Price)
                })
                .OrderByDescending(x => x.SpentMoney)
                .ToList();

            const string root = "customers";

            var xml = XmlConverter.Serialize(customers, root);

            return xml;
        }
        public static string GetCarsWithTheirListOfParts(CarDealerContext context)
        {
            var cars = context.Cars
                .Where(x => x.PartCars.Count > 0)
                .Select(x => new CarWithPartsOutputModel
                {
                    Make = x.Make,
                    Model = x.Model,
                    TravelledDistance = x.TravelledDistance,
                    Parts = x.PartCars.Select(y => new PartOutputModel
                    {
                        Name = y.Part.Name,
                        Price = y.Part.Price
                    })
                    .OrderByDescending(x => x.Price)
                    .ToArray()
                })
                .OrderByDescending(x => x.TravelledDistance)
                .ThenBy(x => x.Model)
                .Take(5)
                .ToList();

            const string root = "cars";

            var xml = XmlConverter.Serialize(cars, root);

            return xml;
        }
        public static string GetLocalSuppliers(CarDealerContext context)
        {
            var suppliers = context.Suppliers
                .Where(x => x.IsImporter == false)
                .Select(x => new NationalSupplierOutputModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Parts = x.Parts.Count
                })
                .ToList();

            const string root = "suppliers";

            var xml = XmlConverter.Serialize(suppliers, root);

            return xml;
        }
        public static string GetCarsFromMakeBmw(CarDealerContext context)
        {
            var cars = context.Cars
                .Where(x => x.Make == "BMW")
                .Select(x => new BmwCarOutputModel
                {
                    Id = x.Id,
                    Model = x.Model,
                    TravelledDistance = x.TravelledDistance
                })
                .OrderBy(x => x.Model)
                .ThenByDescending(x => x.TravelledDistance)
                .ToArray();

            const string root = "cars";

            var xml = XmlConverter.Serialize(cars, root);

            return xml;
        }
        public static string GetCarsWithDistance(CarDealerContext context)
        {
            var cars = context.Cars.Where(x => x.TravelledDistance > 2_000_000)
                .Select(x => new CarOutputModel
                {
                    Make = x.Make,
                    Model = x.Model,
                    TraveledDistance = x.TravelledDistance
                })
                .OrderBy(x => x.Make)
                .ThenBy(x => x.Model)
                .Take(10)
                .ToArray();

            const string root = "cars";

            var xml = XmlConverter.Serialize(cars, root);

            return xml;
        }
        public static string ImportSales(CarDealerContext context, string inputXml)
        {
            const string root = "Sales";

            var salesDto = XmlConverter.Deserializer<SaleInputModel>(inputXml, root);

            var cars = context.Cars.Select(x => x.Id).ToList();

            var sales = salesDto
                .Where(x => cars.Contains(x.CarId))
                .Select(x => new Sale
                {
                    CarId = x.CarId,
                    CustomerId = x.CustomerId,
                    Discount = x.Discount
                })
                .ToList();

            context.Sales.AddRange(sales);
            context.SaveChanges();

            return $"Successfully imported {sales.Count}";
        }
        public static string ImportCustomers(CarDealerContext context, string inputXml)
        {
            const string root = "Customers";

            var customersDto = XmlConverter.Deserializer<CustomerInputModel>(inputXml, root);

            var customers = customersDto.Select(x => new Customer
            {
                Name = x.Name,
                BirthDate = x.BirthDate,
                IsYoungDriver = x.IsYoungDriver
            })
            .ToList();

            context.Customers.AddRange(customers);
            context.SaveChanges();

            return $"Successfully imported {customers.Count}";
        }
        public static string ImportCars(CarDealerContext context, string inputXml)
        {
            const string root = "Cars";

            var carsDto = XmlConverter.Deserializer<CarInputModel>(inputXml, root);

            var allParts = context.Parts.Select(x => x.Id)
                .ToList();

            var cars = carsDto
                .Select(x => new Car
                {
                    Make = x.Make,
                    Model = x.Model,
                    TravelledDistance = x.TraveledDistance,
                    PartCars = x.CarPartsInputModel.Select(y => y.Id)
                                .Distinct()
                                .Intersect(allParts)
                                .Select(pc => new PartCar
                                {
                                    PartId = pc
                                })
                                .ToList()
                })
                .ToList();

            context.Cars.AddRange(cars);
            context.SaveChanges();


            return $"Successfully imported {cars.Count}";
        }
        public static string ImportParts(CarDealerContext context, string inputXml)
        {
            const string root = "Parts";

            var partsDto = XmlConverter.Deserializer<PartInputModel>(inputXml, root);

            var supplierIds = context.Suppliers.Select(x => x.Id)
                .ToList();

            var parts = partsDto
                .Where(x => supplierIds.Contains(x.SupplierId))
                .Select(x => new Part
            {
                Name = x.Name,
                Price = x.Price,
                Quantity = x.Quantity,
                SupplierId = x.SupplierId
            })
            .ToList();

            context.Parts.AddRange(parts);
            context.SaveChanges();

            return $"Successfully imported {parts.Count}";
        }
        public static string ImportSuppliers(CarDealerContext context, string inputXml)
        {
            const string root = "Suppliers";

            var suppliersDto = XmlConverter.Deserializer<SupplierInputModel>(inputXml, root);

            var suppliers = suppliersDto.Select(x => new Supplier
            {
                Name = x.Name,
                IsImporter = x.IsImporter
            })
            .ToList();

            context.Suppliers.AddRange(suppliers);
            context.SaveChanges();

            return $"Successfully imported {suppliers.Count}";
        }
    }
}