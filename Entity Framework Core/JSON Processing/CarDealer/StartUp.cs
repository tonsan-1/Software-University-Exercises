using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using CarDealer.Data;
using CarDealer.DTO;
using CarDealer.Models;
using Newtonsoft.Json;

namespace CarDealer
{
    public class StartUp
    {
        static IMapper mapper;
        public static void Main(string[] args)
        {
            var cardealerDbContext = new CarDealerContext();

            cardealerDbContext.Database.EnsureDeleted();
            cardealerDbContext.Database.EnsureCreated();

            var suppliersInputJson = File.ReadAllText("../../../Datasets/suppliers.json");
            var partsInputJson = File.ReadAllText("../../../Datasets/parts.json");
            var carsInputJson = File.ReadAllText("../../../Datasets/cars.json");



            ImportSuppliers(cardealerDbContext, suppliersInputJson);
            ImportParts(cardealerDbContext, partsInputJson);

            Console.WriteLine(ImportCars(cardealerDbContext,carsInputJson));
        }

        public static string ImportCars(CarDealerContext context, string inputJson)
        {
            InitializeAutoMapper();

            var dtoCars = JsonConvert.DeserializeObject<IEnumerable<CarInputModel>>(inputJson);

            var cars = new List<Car>();

            foreach (var car in dtoCars)
            {
                var currCar = new Car
                {
                    Make = car.Make,
                    Model = car.Model,
                    TravelledDistance = car.TravelledDistance
                };
                ;
                foreach (var partId in car?.PartsId.Distinct())
                {
                    currCar.PartCars.Add(new PartCar
                    {
                        PartId = partId,
                    });
                };
                cars.Add(currCar);
            }

            context.Cars.AddRange(cars);
            context.SaveChanges();

            return $"Successfully imported {cars.Count()}.";
        }
        public static string ImportParts(CarDealerContext context, string inputJson)
        {
            InitializeAutoMapper();

            var suppliers = context.Suppliers.Select(x => x.Id);
            var dtoParts = JsonConvert.DeserializeObject<IEnumerable<PartsInputModel>>(inputJson)
                .Where(x => suppliers.Contains(x.SupplierId));

            var parts = mapper.Map<IEnumerable<Part>>(dtoParts);

            context.Parts.AddRange(parts);
            context.SaveChanges();

           return $"Successfully imported {parts.Count()}.";
        }
        public static string ImportSuppliers(CarDealerContext context, string inputJson)
        {
            InitializeAutoMapper();

            var dtoSuppliers = JsonConvert.DeserializeObject<IEnumerable<SupplierInputModel>>(inputJson);

            var suppliers = mapper.Map<IEnumerable<Supplier>>(dtoSuppliers);

            context.Suppliers.AddRange(suppliers);
            context.SaveChanges();

           return $"Successfully imported {suppliers.Count()}.";
        }
        private static void InitializeAutoMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<CarDealerProfile>();
            });

            mapper = config.CreateMapper();
        }
    }
}