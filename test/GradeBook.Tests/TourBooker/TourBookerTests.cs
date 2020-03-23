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
            allCountriesByKey.TryGetValue(new CountryCode("CHN"), out Country country);

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
            allCountriesByKey.TryGetValue(new CountryCode("chn"), out Country country);

            // Assert
            Assert.Equal("China", country.Name);
        }

        [Fact]
        public void it_uses_sorted_dictionary()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();

            // Act
            var sortedDictionary = appData.AllCountriesSorted;

            // Assert
            foreach (var (key, value) in sortedDictionary)
            {
                _testOutputHelper.WriteLine("{1} ({0})", value, key);
            }
        }

        [Fact]
        public void it_uses_sorted_list()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();

            // Act
            var sortedList = appData.AllCountriesSortedWithList;

            // Assert
            foreach (var (key, value) in sortedList)
            {
                _testOutputHelper.WriteLine("{1} ({0})", value, key);
            }
        }

        [Fact]
        public void it_adds_a_new_country_using_linked_list()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();
            var allCountries = appData.AllCountries;
            Country firstCountry = allCountries[0];
            Country secondCountry = allCountries[10];
            Country thirdCountry = allCountries[50];

            // Act
            appData.ItineraryBuilder.AddLast(firstCountry);
            appData.ItineraryBuilder.AddLast(secondCountry);
            appData.ItineraryBuilder.AddLast(thirdCountry);

            // Assert
            Assert.Equal(3, appData.ItineraryBuilder.Count());
        }

        [Fact]
        public void it_removes_a_country_from_linked_list()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();
            var allCountries = appData.AllCountries;
            Country firstCountry = allCountries[0];
            Country secondCountry = allCountries[10];
            Country thirdCountry = allCountries[50];
            appData.ItineraryBuilder.AddLast(firstCountry);
            appData.ItineraryBuilder.AddLast(secondCountry);
            appData.ItineraryBuilder.AddLast(thirdCountry);

            // Act
            appData.ItineraryBuilder.Remove(secondCountry);

            // Assert
            Assert.Equal(2, appData.ItineraryBuilder.Count());
        }

        [Fact]
        public void it_inserts_before_a_specified_country_in_linked_list()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();
            var allCountries = appData.AllCountries;
            Country firstCountry = allCountries[0];
            Country secondCountry = allCountries[10];
            Country thirdCountry = allCountries[50];
            Country hundrethCountry = allCountries[100];
            appData.ItineraryBuilder.AddLast(firstCountry);
            appData.ItineraryBuilder.AddLast(secondCountry);
            appData.ItineraryBuilder.AddLast(thirdCountry);

            // Act
            var insertBeforeNode = appData.ItineraryBuilder.Find(thirdCountry);
            appData.ItineraryBuilder.AddBefore(insertBeforeNode, hundrethCountry);

            // Assert
            Assert.Equal(4, appData.ItineraryBuilder.Count());
        }

        [Fact]
        public void it_saves_the_tour_for_various_countries()
        {
            // Arrange
            string aTourName = "ATour";
            string dTourName = "DTour";
            string zTourName = "ZTour";
            string eTourName = "ETour";

            var appData = new AppData();
            appData.Initialise();
            var allCountries = appData.AllCountries;
            var india = allCountries.Find(country => country.Name == "India");
            var pakistan = allCountries.Find(country => country.Name == "Pakistan");
            var brazil = allCountries.Find(country => country.Name == "Brazil");
            var bulgaria = allCountries.Find(country => country.Name == "Bulgaria");

            var france = allCountries.Find(country => country.Name == "France");
            var serbia = allCountries.Find(country => country.Name == "Serbia");
            var libya = allCountries.Find(country => country.Name == "Libya");

            var bermuda = allCountries.Find(country => country.Name == "Bermuda");
            var monaco = allCountries.Find(country => country.Name == "Monaco");

            // Act
            appData.ItineraryBuilder.AddFirst(india);
            appData.ItineraryBuilder.AddFirst(brazil);
            appData.ItineraryBuilder.AddFirst(pakistan);
            appData.ItineraryBuilder.AddFirst(bulgaria);
            appData.ItineraryBuilder.AddFirst(france);
            appData.ItineraryBuilder.AddFirst(monaco);
            appData.ItineraryBuilder.AddFirst(bermuda);
            appData.ItineraryBuilder.AddFirst(serbia);
            appData.ItineraryBuilder.AddFirst(libya);

            var countriesToVisitOnTourE = appData.ItineraryBuilder.ToArray();

            Tour eTour = new Tour(eTourName, countriesToVisitOnTourE);
            Tour aTour = new Tour(aTourName, new[] {france, bermuda, monaco});
            Tour dTour = new Tour(dTourName, new[] {libya, france, india});
            Tour zTour = new Tour(zTourName, new[] {pakistan, libya, monaco});

            appData.AllTours.Add(eTourName, eTour);
            appData.AllTours.Add(zTourName, zTour);
            appData.AllTours.Add(aTourName, aTour);
            appData.AllTours.Add(dTourName, dTour);

            // Assert
            Assert.Equal(4, appData.AllTours.Count());

            foreach (var (tourName, tour) in appData.AllTours)
            {
                _testOutputHelper.WriteLine(tour.ToString());
            }
        }

        [Fact]
        public void it_adds_a_new_country_using_linked_list_and_saves_the_change_log_on_stack()
        {
            // Arrange
            var appData = new AppData();
            appData.Initialise();
            var allCountries = appData.AllCountries;
            Country firstCountry = allCountries[0];
            Country secondCountry = allCountries[10];
            Country thirdCountry = allCountries[50];

            // Act
            addCountryToItineraryWithChangeLog(appData, firstCountry);
            addCountryToItineraryWithChangeLog(appData, secondCountry);
            addCountryToItineraryWithChangeLog(appData, thirdCountry);

            // Assert
            Assert.Equal(3, appData.ItineraryBuilder.Count());
            Assert.Equal(3, appData.ChangeLog.Count());
        }

        private void addCountryToItineraryWithChangeLog(AppData appData, Country country)
        {
            appData.ItineraryBuilder.AddLast(country);
            var change = new ItineraryChange(ChangeType.Append, 
                appData.ItineraryBuilder.Count, 
                country);
            appData.ChangeLog.Push(change);
        }

        private Country GetCountryWithCountryCode(List<Country> countries, string code)
        {
            if (code.Length != 3)
            {
                return null;
            }

            return countries.Find(x => x.Code.Equals(new CountryCode(code)));
        }
    }
}