using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using GradeBook.Tests.Cars;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.TipsAndTricks
{
    public class StringProcessWithTupleTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public StringProcessWithTupleTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_uses_tuple_to_process_strings()
        {
            // Arrange
            StringProcessorWithTuple stringProcessorWithTuple = new StringProcessorWithTuple();

            var upperAndWithLength =
                stringProcessorWithTuple.ToUpperAndWithLength(
                    new List<string>() {"hey", "belim", "yoyoyoyoyo", "bored"});

            foreach (var s in upperAndWithLength)
            {
                _testOutputHelper.WriteLine($"converted value : {s}");
            }
        }

        [Fact]
        public void it_gets_environment_variables()
        {
            // Arrange
            var environmentVariables = Environment.GetEnvironmentVariables();

            _testOutputHelper.WriteLine($"Environment variable path value : {environmentVariables["PATH"]}");
            _testOutputHelper.WriteLine($"Is64BitOperatingSystem : {Environment.Is64BitOperatingSystem}");
            _testOutputHelper.WriteLine($"Is64BitProcess : {Environment.Is64BitProcess}");
            _testOutputHelper.WriteLine($"ProcessorCount : {Environment.ProcessorCount}");
            _testOutputHelper.WriteLine($"SystemPageSize : {Environment.SystemPageSize}");
        }
    }
}