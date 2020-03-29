using System;
using System.Linq;
using System.Security.Cryptography;
using GradeBook.Tests.Cars;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.TipsAndTricks
{
    public class CryptoRandomNumberTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public CryptoRandomNumberTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_generates_cryptographically_generated_random_number()
        {
            // Arrange
            int result = GetRandomNumber();
            
            _testOutputHelper.WriteLine(result.ToString());
        }

        private static int GetRandomNumber()
        {
            int result;
            using (RNGCryptoServiceProvider rnd = new RNGCryptoServiceProvider())
            {
                byte[] randomBytes = new byte[4];

                rnd.GetBytes(randomBytes);

                result = BitConverter.ToInt32(randomBytes, 0);
            }

            return result;
        }
    }
}