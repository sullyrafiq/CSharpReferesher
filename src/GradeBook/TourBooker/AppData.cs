using System.Collections.Generic;

namespace GradeBook.TourBooker
{
    public class AppData
    {
        public List<Country> AllCountries { get; private set; }

        public void Initialise()
        {
            CsvReader reader = new CsvReader();
            AllCountries = reader.ReadAllCountries();
        }
    }
}