using System;
using System.Collections.Generic;
using System.Linq;
using GradeBook.datastructures;
using GradeBook.TourBooker;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.TourBooker
{
    public class TourBookerTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public TourBookerTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_loads_and_prints_all_countries_from_csv()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();

            // Act
            var allCountries = appData.AllCountries;

            // Assert
            Assert.Equal(217, allCountries.Count());

            foreach (var country in allCountries)
            {
                _testOutputHelper.WriteLine(country.ToString());
            }
        }

        [Fact]
        public void it_should_sort_countries_by_alphabetical_order()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();
            var allCountries = appData.AllCountries;

            // Act
            var sortedCountries = allCountries
                .OrderBy(x => x.Name)
                .ToList();

            // Assert
            Assert.Equal(217, sortedCountries.Count());

            Assert.Equal("Afghanistan", sortedCountries[0].Name);
            Assert.Equal("Zimbabwe", sortedCountries[216].Name);
        }

        [Fact]
        public void it_finds_country_by_country_code()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();
            var allCountries = appData.AllCountries;

            // Act
            Country country = GetCountryWithCountryCode(allCountries, "CHN");

            // Assert
            Assert.Equal("China", country.Name);
        }

        [Fact]
        public void it_finds_country_by_country_code_but_using_dictionary()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();
            var allCountriesByKey = appData.AllCountriesByKey;

            // Act
            allCountriesByKey.TryGetValue("CHN", out Country country);

            // Assert
            Assert.Equal("China", country.Name);
        }
        
        [Fact]
        public void it_finds_country_by_country_code_but_using_dictionary_and_with_lowercase_country_code()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();
            var allCountriesByKey = appData.AllCountriesByKey;

            // Act
            allCountriesByKey.TryGetValue("chn", out Country country);

            // Assert
            Assert.Equal("China", country.Name);
        }

        private Country GetCountryWithCountryCode(List<Country> countries, string code)
        {
            if (code.Length != 3)
            {
                return null;
            }

            return countries.Find(x => x.Code == code);
        }
    }
}