using System;
using System.Linq;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.Cars
{
    public class CarsLinqTest
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public CarsLinqTest(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_reads_cars_from_csv()
        {
            // Arrange
            var carReader = new CarReader();
            var cars = carReader.ProcessCars("TestAssets/fuel.csv");

            foreach (var car in cars)
            {
                _testOutputHelper.WriteLine(car.Name);
            }
        }

        [Fact]
        public void it_orders_car_by_fuel_efficiency()
        {
            // Arrange
            var carReader = new CarReader();
            var cars = carReader.ProcessCars("TestAssets/fuel.csv")
                .OrderByDescending(car => car.Combined)
                .ThenByDescending(car => car.Name);

            foreach (var car in cars.Take(10))
            {
                _testOutputHelper.WriteLine($"{car.Name} : {car.Combined}");
            }
        }

        [Fact]
        public void it_orders_car_by_fuel_efficiency_for_a_manufacturer_and_year_2016()
        {
            // Arrange
            var carReader = new CarReader();
            var cars = carReader.ProcessCars("TestAssets/fuel.csv")
                .Where(car => car.Manufacturer == "BMW" && car.Year == 2016)
                .OrderByDescending(car => car.Combined)
                .ThenByDescending(car => car.Name);

            foreach (var car in cars.Take(10))
            {
                _testOutputHelper.WriteLine($"{car.Name} : {car.Combined}");
            }
        }

        [Fact]
        public void it_return_first_car_by_fuel_efficiency_for_a_manufacturer_and_year_2016()
        {
            // Arrange
            var carReader = new CarReader();
            var topCar = carReader.ProcessCars("TestAssets/fuel.csv")
                .Where(car => car.Manufacturer == "BMW" && car.Year == 2016)
                .OrderByDescending(car => car.Combined)
                .ThenByDescending(car => car.Name)
                .First();

            _testOutputHelper.WriteLine($"{topCar.Manufacturer} - {topCar.Name} : {topCar.Combined}");
        }

        [Fact]
        public void it_return_firstOrDefault_car_by_fuel_efficiency_for_a_manufacturer_and_year_2016()
        {
            // Arrange
            var carReader = new CarReader();
            var topCar = carReader.ProcessCars("TestAssets/fuel.csv")
                .Where(car => car.Manufacturer == "Salim" && car.Year == 2016)
                .OrderByDescending(car => car.Combined)
                .ThenByDescending(car => car.Name)
                .FirstOrDefault();

            _testOutputHelper.WriteLine(topCar == null
                ? "**** NO CAR FOUND ****"
                : $"{topCar.Manufacturer} - {topCar.Name} : {topCar.Combined}");
        }

        [Fact]
        public void it_return_last_car_by_fuel_efficiency_for_a_manufacturer_and_year_2016()
        {
            // Arrange
            var carReader = new CarReader();
            var topCar = carReader.ProcessCars("TestAssets/fuel.csv")
                .Where(car => car.Manufacturer == "BMW" && car.Year == 2016)
                .OrderByDescending(car => car.Combined)
                .ThenByDescending(car => car.Name)
                .Last();

            _testOutputHelper.WriteLine($"{topCar.Manufacturer} - {topCar.Name} : {topCar.Combined}");
        }

        [Fact]
        public void it_return_any_car_for_BMW()
        {
            // Arrange
            var carReader = new CarReader();
            var result = carReader.ProcessCars("TestAssets/fuel.csv")
                .Any(car => car.Manufacturer == "BMW");

            _testOutputHelper.WriteLine(result.ToString());
        }

        [Fact]
        public void it_uses_projection_to_create_new_item()
        {
            // Arrange
            var carReader = new CarReader();
            var projectedCars = carReader.ProcessCars("TestAssets/fuel.csv")
                .Where(car => car.Manufacturer == "BMW" && car.Year == 2016)
                .OrderByDescending(car => car.Combined)
                .ThenByDescending(car => car.Name)
                .Select(car => new
                {
                    car.Manufacturer,
                    car.Name,
                    car.Combined
                });

            foreach (var car in projectedCars)
            {
                _testOutputHelper.WriteLine($"{car.Manufacturer} - {car.Name} : {car.Combined}");
            }
        }

        [Fact]
        public void it_uses_join_to_combine_car_and_manufacturer()
        {
            // Arrange
            var carReader = new CarReader();
            var manufacturers = carReader.ProcessManufacturers("TestAssets/manufacturers.csv");

            var cars = carReader
                .ProcessCars("TestAssets/fuel.csv")
                .Join(manufacturers,
                    car => car.Manufacturer,
                    manufacturer => manufacturer.Name,
                    (car, manufacturer) =>
                        new
                        {
                            car.Manufacturer,
                            car.Name,
                            car.Combined,
                            manufacturer.Headquarters
                        })
                .OrderByDescending(car => car.Combined)
                .ThenBy(car => car.Name)
                .Select(car => new
                {
                    car.Headquarters,
                    car.Name,
                    car.Combined
                });

            foreach (var car in cars)
            {
                _testOutputHelper.WriteLine($"{car.Headquarters} - {car.Name} : {car.Combined}");
            }
        }

        [Fact]
        public void it_uses_join_with_multiple_keys_to_combine_car_and_manufacturer()
        {
            // Arrange
            var carReader = new CarReader();
            var manufacturers = carReader.ProcessManufacturers("TestAssets/manufacturers.csv");

            var cars = carReader
                .ProcessCars("TestAssets/fuel.csv")
                .Join(manufacturers,
                    c => new {c.Manufacturer, c.Year},
                    m => new {Manufacturer = m.Name, m.Year},
                    (car, manufacturer) =>
                        new
                        {
                            car.Manufacturer,
                            car.Name,
                            car.Combined,
                            manufacturer.Headquarters
                        })
                .OrderByDescending(car => car.Combined)
                .ThenBy(car => car.Name)
                .Select(car => new
                {
                    car.Headquarters,
                    car.Name,
                    car.Combined
                });

            foreach (var car in cars)
            {
                _testOutputHelper.WriteLine($"{car.Headquarters} - {car.Name} : {car.Combined}");
            }
        }

        [Fact]
        public void it_group_cars_by_manufacturer_and_shows_two_most_efficient_cars()
        {
            // Arrange
            var carReader = new CarReader();
            var manufacturers = carReader.ProcessManufacturers("TestAssets/manufacturers.csv");

            var query = carReader
                .ProcessCars("TestAssets/fuel.csv")
                .GroupBy(car => car.Manufacturer.ToUpper())
                .OrderBy(group => group.Key);

            foreach (var group in query)
            {
                _testOutputHelper.WriteLine($"{group.Key} has {group.Count()} cars");

                foreach (var car in group.OrderByDescending(g => g.Combined).Take(2))
                {
                    _testOutputHelper.WriteLine($"\t{car.Name} : {car.Combined}");
                }
            }
        }

        [Fact]
        public void it_uses_group_join()
        {
            // Arrange
            var carReader = new CarReader();
            var manufacturers = carReader.ProcessManufacturers("TestAssets/manufacturers.csv");
            var cars = carReader.ProcessCars("TestAssets/fuel.csv");

            var query = manufacturers
                .GroupJoin(cars,
                    m => m.Name,
                    c => c.Manufacturer,
                    (m, g) =>
                        new
                        {
                            Manufacturer = m,
                            Cars = g
                        }
                )
                .OrderBy(m => m.Manufacturer.Name);

            foreach (var group in query)
            {
                _testOutputHelper.WriteLine($"{group.Manufacturer.Name} : {group.Manufacturer.Headquarters}");

                foreach (var car in group.Cars.OrderByDescending(g => g.Combined).Take(2))
                {
                    _testOutputHelper.WriteLine($"\t{car.Name} : {car.Combined}");
                }
            }
        }

        [Fact]
        public void it_uses_aggregation()
        {
            // Arrange
            var carReader = new CarReader();
            var manufacturers = carReader.ProcessManufacturers("TestAssets/manufacturers.csv");
            var cars = carReader.ProcessCars("TestAssets/fuel.csv");

            var query = cars
                .GroupBy(c => c.Manufacturer)
                .Select(g =>
                {
                    var results = g.Aggregate(new CarStatistics(),
                        (acc, c) => acc.Accumulate(c),
                        acc => acc.Compute());

                    return new
                    {
                        Name = g.Key,
                        Avg = results.Average,
                        Max = results.Max,
                        Min = results.Min
                    };
                })
                .OrderByDescending(r => r.Max);


            foreach (var result in query)
            {
                _testOutputHelper.WriteLine($"{result.Name}");
                _testOutputHelper.WriteLine($"\t Max : {result.Max}");
                _testOutputHelper.WriteLine($"\t Min : {result.Min}");
                _testOutputHelper.WriteLine($"\t Avg : {result.Avg}");
            }
        }
    }

    public class CarStatistics
    {
        public CarStatistics()
        {
            Max = Int32.MinValue;
            Min = Int32.MaxValue;
        }

        public double Max { get; set; }
        public double Min { get; set; }
        public double Average { get; set; }
        public double Total { get; set; }
        public double Count { get; set; }

        public CarStatistics Accumulate(Car car)
        {
            Count += 1;
            Total += car.Combined;
            Max = Math.Max(Max, car.Combined);
            Min = Math.Min(Min, car.Combined);
            return this;
        }

        public CarStatistics Compute()
        {
            Average = Total / Count;
            return this;
        }
    }
}