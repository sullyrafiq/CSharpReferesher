using System;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.ExceptionHandling
{
    public class CalculatorTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public CalculatorTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_calculates()
        {
            // Arrange
            var calculator = new Calculator(_testOutputHelper);

            // Act
            var outputValue = calculator.Calculate(1, 2, "/");
            var outputValueNoOp = calculator.Calculate(1, 2, "");

            _testOutputHelper.WriteLine("outputValue : {0}", outputValue);
            _testOutputHelper.WriteLine("outputValue : {0}", outputValueNoOp);
        }

        [Fact]
        public void it_throws_divide_by_zero_exception()
        {
            // Arrange
            var calculator = new Calculator(_testOutputHelper);

            // Act
            var outputValue = calculator.Calculate(1, 0, "/");

            // Assert
            _testOutputHelper.WriteLine("outputValue : {0}", outputValue);
        }

        [Fact]
        public void it_throws_ArgumentOutOfRangeException()
        {
            // Arrange
            var calculator = new Calculator(_testOutputHelper);

            // Act
            var outputValue = calculator.Calculate(1, 0, "+");

            // Assert
            _testOutputHelper.WriteLine("outputValue : {0}", outputValue);
        }

        [Fact]
        public void it_catches_ArgumentOutOfRangeException()
        {
            // Arrange
            var calculator = new Calculator(_testOutputHelper);

            // Act
            try
            {
                var outputValue = calculator.Calculate(1, 0, "+");
            }
            catch (Exception ex)
            {
                _testOutputHelper.WriteLine($"Sorry, something went wrong {ex}");
            }
        }
    }
}