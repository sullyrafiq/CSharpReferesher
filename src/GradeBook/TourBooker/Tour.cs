using System;

namespace GradeBook.TourBooker
{
    public class Tour
    {
        public string Name { get; }
        public Country[] Itinerary { get; }

        public override string ToString()
        {
            return $"{Name} ({Itinerary.Length} countries)";
        }

        public Tour(string name, Country[] itinerary)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Tour must have a non-whitespace name", nameof(name));

            if (itinerary == null)
                throw new ArgumentException("Itinerary cannot be null", nameof(itinerary));

            if(itinerary.Length == 0)
                throw new ArgumentException("Tour must have at least one county", nameof(itinerary));

            this.Name = name;
            this.Itinerary = itinerary;
        }
    }
}