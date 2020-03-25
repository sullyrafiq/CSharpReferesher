using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace GradeBook.Tests.Cars
{
    public class CarReader
    {
        public List<Car> ProcessCars(string filePath)
        {
            var list = File.ReadAllLines(filePath)
                .Skip(1)
                .Where(line => line.Length > 1)
                .Select(Car.ParseFromCsv)
                .ToList();
            
            return list;
        }
        
        public List<Manufacturer> ProcessManufacturers(string filePath)
        {
            var list = File.ReadAllLines(filePath)
                .Where(line => line.Length > 1)
                .Select(Manufacturer.ParseFromCsv)
                .ToList();
            
            return list;
        }
    }
}