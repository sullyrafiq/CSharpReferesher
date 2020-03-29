namespace GradeBook.Tests.Cars
{
    public class Car
    {
        public int Year { get; set; }
        public string Manufacturer { get; set; }
        public string Name { get; set; }
        public double Displacement { get; set; }
        public int Cylinders { get; set; }
        public double City { get; set; }
        public double Highway { get; set; }
        public double Combined { get; set; }

        public static Car ParseFromCsv(string line)
        {
            var columns = line.Split(",");

            return new Car()
            {
                Year = int.Parse(columns[0]),
                Manufacturer = columns[1],
                Name = columns[2],
                Displacement = double.Parse(columns[3]),
                Cylinders = int.Parse(columns[4]),
                City = double.Parse(columns[5]),
                Highway = double.Parse(columns[6]),
                Combined = double.Parse(columns[7]),
            };
        }
    }
}