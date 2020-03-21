using System;

namespace GradeBook.TourBooker
{
    public class CountryCode
    {
        public string Value { get; }

        public CountryCode(string value)
        {
            Value = value;
        }

        public override bool Equals(object? obj)
        {
            if (obj is CountryCode other)
                return StringComparer.OrdinalIgnoreCase.Equals(this.Value, other.Value);

            return false;
        }

        public override int GetHashCode()
        {
            return StringComparer.OrdinalIgnoreCase.GetHashCode(this.Value);
        }

        public override string ToString()
        {
            return Value;
        }
    }
}