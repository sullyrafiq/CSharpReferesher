using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.StatePattern
{
    public class StatePatternTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public StatePatternTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_uses_state_pattern()
        {
            // Arrange
        }

    }
}