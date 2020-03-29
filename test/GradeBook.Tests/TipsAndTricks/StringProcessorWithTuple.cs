using System.Collections.Generic;
using System.Linq;

namespace GradeBook.Tests.TipsAndTricks
{
    public class StringProcessorWithTuple
    {
        public List<string> ToUpperAndWithLength(List<string> stringsToProcess)
        {
            return stringsToProcess
                .Select(s => Process(s))
                .Select(result => $"{result.Length}--{result.UppercaseVersion}")
                .ToList();
        }

        private (int Length, string UppercaseVersion) Process(string s)
        {
            return (s.Length, s.ToUpperInvariant());
        }
    }
}