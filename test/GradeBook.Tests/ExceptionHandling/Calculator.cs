using System;
using Xunit.Abstractions;

namespace GradeBook.Tests.ExceptionHandling
{
    public class Calculator
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public Calculator(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        public int Calculate(int number1, int number2, string operation)
        {
            if (operation == "/")
            {
                return Divide(number1, number2);
            }
            else
            {
                /*
                 _testOutputHelper.WriteLine("Unknown operation");
                return 0;
                */
                
                throw new ArgumentOutOfRangeException(nameof(operation),
                    "The mathematical operator is not supported");
            }
        }

        private int Divide(int number, int divisor)
        {
            return number / divisor;
        }
    }
}