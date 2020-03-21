using System;
using System.Collections.Generic;
using System.Linq;

namespace GradeBook.TourBooker
{
    public class AppData
    {
        public List<Country> AllCountries { get; private set; }

        public Dictionary<string, Country> AllCountriesByKey { get; private set; }

        public void Initialise()
        {
            CsvReader reader = new CsvReader();
            AllCountries = reader.ReadAllCountries();
            AllCountriesByKey = AllCountries.ToDictionary(x => x.Code, StringComparer.OrdinalIgnoreCase);
        }
    }
}