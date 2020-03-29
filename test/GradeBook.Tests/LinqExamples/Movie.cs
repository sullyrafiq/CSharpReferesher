using System;

namespace GradeBook.Tests.LinqExamples
{
    public class Movie
    {
        public string Title { get; set; }
        public float Rating { get; set; }

        private int _year;

        public int Year
        {
            get
            {
                Console.WriteLine($"Returning year {_year} for Title {Title}");
                return _year;
            }
            set { _year = value; }
        }
    }
}