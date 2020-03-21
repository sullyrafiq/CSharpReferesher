using System;
using System.Collections.Generic;
using System.IO;

namespace GradeBook.TourBooker
{
    public class CsvReader
    {
        private readonly string _csvFilePath;

        public CsvReader()
        {
            _csvFilePath = "TestAssets/PopByLargest.csv";
        }

        public List<Country> ReadAllCountries()
        {
            List<Country> countries = new List<Country>();
            FileStream fileStream = new FileStream(_csvFilePath, FileMode.Open);

            using (StreamReader sr = new StreamReader(fileStream))
            {
                sr.ReadLine();

                string csvLine;

                while ((csvLine = sr.ReadLine()) != null)
                {
                    countries.Add(ReadCountryFromCsvLine(csvLine));
                }
            }

            return countries;
        }

        private Country ReadCountryFromCsvLine(string csvLine)
        {
            var parts = csvLine.Split(",");

            string name;
            string code;
            string region;
            string popText;

            switch (parts.Length)
            {
                case 4:
                    name = parts[0];
                    code = parts[1];
                    region = parts[2];
                    popText = parts[3];
                    break;
                case 5:
                    name = parts[0] + ", " + parts[1];
                    name = name.Replace("\"", null).Trim();
                    code = parts[2];
                    region = parts[3];
                    popText = parts[4];
                    break;
                default:
                    throw new Exception($"Can't parse country from csvLine: {csvLine}");
            }

            int.TryParse(popText, out int population);
            return new Country(name, code, region, population);
        }
    }
}