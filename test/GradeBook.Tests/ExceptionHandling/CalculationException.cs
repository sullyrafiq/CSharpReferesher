using System;

namespace GradeBook.Tests.ExceptionHandling
{
    public class CalculationException : Exception
    {
        private static readonly string DefaultMessage = "An error occured during calculation";

        public CalculationException() : base(DefaultMessage)
        {
        }

        public CalculationException(string message)
            : base(message)
        {
        }

        public CalculationException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}