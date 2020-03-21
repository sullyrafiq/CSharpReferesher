using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;

namespace GradeBook.TourBooker
{
    public class AppData
    {
        public List<Country> AllCountries { get; private set; }

        public Dictionary<CountryCode, Country> AllCountriesByKey { get; private set; }
        public SortedDictionary<CountryCode, Country> AllCountriesSorted { get; private set; }
        public SortedList<CountryCode, Country> AllCountriesSortedWithList { get; private set; }

        public void Initialise()
        {
            CsvReader reader = new CsvReader();
            AllCountries = reader.ReadAllCountries();
            AllCountriesByKey = AllCountries.ToDictionary(x => x.Code);
            AllCountriesSorted = new SortedDictionary<CountryCode, Country>(new CountryCodeComparer());
            AllCountriesSortedWithList = new SortedList<CountryCode, Country>(new CountryCodeComparer());
        }
    }

    public class CountryCodeComparer : IComparer<CountryCode>
    {
        public int Compare(CountryCode x, CountryCode y) =>
            String.Compare(x.Value, y.Value, StringComparison.Ordinal);
    }
}