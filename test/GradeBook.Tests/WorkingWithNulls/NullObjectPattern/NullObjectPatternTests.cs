using System;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.WorkingWithNulls.NullObjectPattern
{
    public class NullObjectPatternTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public NullObjectPatternTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_handles_null_without_null_object_pattern()
        {
            // Arrange
            PlayerCharacter sarah = new PlayerCharacter(new DiamondSkinDefence(), _testOutputHelper)
            {
                Name = "Sarah"
            };
            
            PlayerCharacter amrit = new PlayerCharacter(new IronBoneDefence(), _testOutputHelper)
            {
                Name = "Amrit"
            };
            
            PlayerCharacter gentry = new PlayerCharacter(new NullDefence(), _testOutputHelper)
            {
                Name = "Getry"
            };
            
            sarah.Hit(10);
            amrit.Hit(10);
            gentry.Hit(10);
        }
    }
}